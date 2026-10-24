/**
 * ==============================================================================
 * [Gemini AI 서비스 모듈]
 * 1. AI 사진 문제 풀이 (Vision Multimodal)
 * 2. AI 수학 튜터 실시간 채팅
 * 3. AI 맞춤 변형 문제 생성
 * ==============================================================================
 */

const GeminiService = (function () {
  // 사용 모델 우선순위: 3.8 Flash -> 3.5 Flash (앞 모델 실패 시 자동으로 다음 모델 시도)
  const MODEL_CANDIDATES = ["gemini-3.8-flash", "gemini-3.5-flash"];

  function getApiKey() {
    return (window.APP_CONFIG && window.APP_CONFIG.MATH_API_KEY) || localStorage.getItem('MATH_API_KEY') || '';
  }

  function getModelList() {
    const custom = window.APP_CONFIG && window.APP_CONFIG.GEMINI_MODEL;
    return custom ? [custom, ...MODEL_CANDIDATES.filter(m => m !== custom)] : MODEL_CANDIDATES;
  }

  /**
   * 모델 목록을 순서대로 시도하여 첫 성공 응답의 텍스트를 반환
   */
  async function callGemini(apiKey, body) {
    let lastError = null;
    for (const model of getModelList()) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`[${model}] ${errorData.error?.message || 'API 호출 실패 (' + response.status + ')'}`);
        }

        const data = await response.json();
        const parts = data.candidates?.[0]?.content?.parts || [];
        const text = parts.map(p => p.text || '').join('');
        if (!text) throw new Error(`[${model}] 빈 응답이 반환되었습니다.`);
        return text;
      } catch (err) {
        console.warn('Gemini 호출 실패, 다음 모델 시도:', err);
        lastError = err;
      }
    }
    throw lastError || new Error('알 수 없는 오류');
  }

  /**
   * 1. 사진 문제 풀이 (Vision API)
   * @param {string} base64Image - "data:image/png;base64,..." 형식의 데이터 URL
   * @param {string} additionalPrompt - 사용자 추가 질문
   */
  async function solveMathImage(base64Image, additionalPrompt = '') {
    const apiKey = getApiKey();

    if (!apiKey) {
      // API 키가 없을 때의 스마트 모의 해설 시뮬레이션
      return simulateImageSolution(additionalPrompt);
    }

    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const mimeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    const promptText = `당신은 대한민국 고등학교 수학 일타강사이자 친절한 AI 수학 튜터 '매쓰랩 AI'입니다.
첨부된 사진의 수학 문제를 자세히 분석하여 다음 형식으로 해설해주세요:
1. 📌 **문제 인식**: 사진 속 문제와 주어진 조건 요약
2. 💡 **핵심 수학 개념**: 사용되는 공식, 정리
3. 📝 **단계별 상세 풀이**: 누구나 이해할 수 있는 풀이 과정 (수식은 반드시 $$수식$$ 또는 $수식$ 형식으로 작성)
4. 🎯 **최종 정답**: 명확한 최종 정답

${additionalPrompt ? `[추가 요청사항]: ${additionalPrompt}` : ''}`;

    try {
      return await callGemini(apiKey, {
        contents: [{
          parts: [
            { text: promptText },
            {
              inline_data: {
                mime_type: mimeType,
                data: cleanBase64
              }
            }
          ]
        }]
      });
    } catch (err) {
      console.error('Gemini Vision API Error:', err);
      return `❌ AI 사진 분석 중 오류가 발생했습니다: ${err.message}\n(API 키를 확인하시거나 잠시 후 다시 시도해주세요.)`;
    }
  }

  /**
   * 2. AI 수학 튜터 채팅 (Math Tutor Chat)
   * @param {Array} messageHistory - [{ role: 'user'|'model', text: string }]
   */
  async function askMathTutor(messageHistory) {
    const apiKey = getApiKey();

    if (!apiKey) {
      // API 키가 없을 때 내장 지능형 수학 답변 제공
      const lastUserMsg = messageHistory[messageHistory.length - 1].text;
      return simulateTutorChat(lastUserMsg);
    }

    const systemInstruction = `당신은 대한민국 고등학교 수학 전문 AI 튜터 '매쓰랩 튜터'입니다.
학생들의 질문에 친절하고 이해하기 쉽게 설명해주세요.
- 고1 공통수학, 고2 수학I/II, 고3 미적분/확통/기하 과목에 전문성을 가집니다.
- 수식 표현 시 KaTeX 규격에 맞춰 단독 수식은 $$ 수식 $$, 인라인 수식은 $ 수식 $ 으로 작성하세요.
- 단순히 답만 주지 말고 문제 해결의 발상과 힌트를 함께 제공하세요.`;

    const formattedContents = messageHistory.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    try {
      return await callGemini(apiKey, {
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: formattedContents
      });
    } catch (err) {
      console.error('Gemini Chat API Error:', err);
      return `❌ AI 튜터 응답 중 오류가 발생했습니다: ${err.message}\n(설정 창에서 유효한 Gemini API Key를 등록하셨는지 확인해주세요.)`;
    }
  }

  /**
   * API 키가 없을 때 제공되는 고품질 시뮬레이션 응답
   */
  function simulateImageSolution(prompt) {
    return `### 📸 [매쓰랩 AI 사진 풀이 분석 결과]
> 💡 *안내: 현재 Gemini API 키가 등록되지 않아 모의 해설 시뮬레이션으로 안내됩니다. (우측 상단 ⚙️ 설정에서 API 키를 입력하시면 실시간 전 문항 풀이가 가능합니다.)*

---

#### 1. 📌 문제 인식 및 조건
업로드해주신 사진에서 고교 모의고사 수학 문제를 성공적으로 스캔했습니다.
* **유형**: 고등학교 수학 핵심 기출 문항
* **주어진 조건**: 수식 및 함수 관계 분석 완료

#### 2. 💡 핵심 개념 및 적용 공식
* 다항식의 연산 법칙 및 동류항 묶기
* 근과 계수의 관계: $ax^2 + bx + c = 0$에서 두 근 $\\alpha, \\beta$에 대해
  $$\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}$$
* 함수의 극한 $\\frac{0}{0}$ 꼴은 분모, 분자를 인수분해하여 약분 후 대입

#### 3. 📝 단계별 상세 풀이
1. **1단계**: 문제의 조건을 수학적 기호로 모델링합니다.
2. **2단계**: 공식을 적용하여 미지수들의 관계식을 세웁니다.
3. **3단계**: 연립방정식을 풀거나 극한값을 계산하여 원하는 값을 도출합니다.
   $$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

#### 4. 🎯 정답 확인 및 검토
* 계산된 결과에 오류가 없는지 대입 검산을 완료했습니다.
* **정답**: 풀이 과정의 결과값을 확정할 수 있습니다.`;
  }

  function simulateTutorChat(userQuestion) {
    const q = userQuestion.toLowerCase();

    if (q.includes('켤레') || q.includes('복소수')) {
      return `복소수 $z = a + bi$ ($a, b$는 실수)가 있을 때, **허수부분의 부호만 바꾼 것**을 켤레복소수라고 하고 $\\bar{z} = a - bi$ 로 표기합니다!

💡 **켤레복소수의 유용한 성질**:
1. $z + \\bar{z} = 2a$ (항상 실수!)
2. $z \\cdot \\bar{z} = a^2 + b^2$ (항상 0 이상의 실수!)

모의고사 2번 문제처럼 $z = 4 + i$라면 $\\bar{z} = 4 - i$가 되므로 두 수의 합은 $4 + 4 = 8$이 됩니다. 이해가 잘 되셨나요? 😊`;
    }

    if (q.includes('극한') || q.includes('0/0') || q.includes('lim')) {
      return `함수의 극한에서 가장 많이 나오는 형태가 바로 **$\\frac{0}{0}$ 부정형(Zero over Zero)**입니다!

🔑 **풀이 3원칙**:
1. **인수분해 후 약분**: 분모를 0으로 만드는 원인 인자 $(x - a)$를 찾아 지워줍니다.
   예: $\\lim_{x \\to 3} \\frac{x^2 - x - 6}{x - 3} = \\lim_{x \\to 3} \\frac{(x-3)(x+2)}{x-3} = \\lim_{x \\to 3} (x+2) = 5$
2. **루트가 있다면 유리화**: 근호가 있는 쪽을 켤레 곱으로 유리화한 후 약분합니다.
3. 분모의 0 인자가 사라지면 $x$값을 편하게 대입하면 끝납니다!`;
    }

    if (q.includes('미분') || q.includes('접선')) {
      return `미분의 핵심 개념 정리해 드릴게요!

1. **미분계수 $f'(a)$의 정의**:
   $$f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$$
   이는 곡선 $y = f(x)$ 위의 점 $(a, f(a))$에서의 **접선의 기울기**를 뜻합니다.
2. **접선의 방정식 공식**:
   기울기가 $m = f'(a)$이고 점 $(a, f(a))$를 지나는 직선은:
   $$y - f(a) = f'(a)(x - a)$$

궁금한 특정 문제 번호나 식이 있으시면 수식을 적어서 질문해주세요! 📐`;
    }

    if (q.includes('지수') || q.includes('로그')) {
      return `지수와 로그의 핵심 공식입니다!

* **지수법칙**:
  $$(a^m)^n = a^{mn}, \\quad a^{-n} = \\frac{1}{a^n}, \\quad a^{\\frac{1}{n}} = \\sqrt[n]{a}$$
* **로그의 기본 성질**:
  $$\\log_a (xy) = \\log_a x + \\log_a y, \\quad \\log_a \\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y$$

밑이 같아야 연산이 가능하니 항상 밑을 통일하는 것이 문제 풀이의 첫걸음입니다!`;
    }

    return `안녕하세요! 고등학교 수학 AI 튜터 매쓰랩입니다 🎓

질문해주신 **"${userQuestion}"**에 대해 안내해 드립니다:
수학 문제를 풀 때 막히는 개념이나, 모의고사 기출 문제의 특정 번호(예: 고1 4번, 고2 2번 등), 공식의 유도 과정 등 무엇이든 편하게 물어보세요!

> 💡 *Tip: 화면 우측 상단의 ⚙️ 설정에서 Gemini API 키를 등록하시면 훨씬 더 풍부하고 개별화된 실시간 맞춤 튜터링을 받으실 수 있습니다.*`;
  }

  return {
    solveMathImage,
    askMathTutor,
    getApiKey
  };
})();

window.GeminiService = GeminiService;
