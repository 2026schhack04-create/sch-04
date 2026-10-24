/**
 * ==========================================================
 * MathLab Application Logic & Mock Exam Quiz Controller
 * ==========================================================
 */

(function () {
  // Application State
  const state = {
    user: null, // { name: '', loginType: 'standard' | 'google' }
    selectedGrade: null, // 'grade-1' | 'grade-2' | 'grade-3'
    currentScreen: 'intro'
  };

  // Quiz State
  const quizState = {
    gradeKey: null,
    questions: [],
    currentIndex: 0,
    userAnswers: [], // Array of selected option indices (0-4)
    submittedStatus: [], // Array of booleans indicating if explanation has been viewed
    timerSeconds: 0,
    timerInterval: null,
    lastWrongQuestions: [], // 오답 문제 저장
    isWrongOnlyMode: false
  };

  // Grade Data Definitions
  const gradeData = {
    'grade-1': {
      title: '고등학교 1학년',
      code: '고1',
      tagline: '고등 수학의 탄탄한 기본기 & 2026 9월 학평 기출',
      courses: [
        '공통수학 1 (다항식의 연산, 복소수, 항등식과 이차부등식)',
        '공통수학 2 (도형의 방정식, 집합과 명제, 순열과 조합)'
      ],
      examName: '2026학년도 9월 고1 전국연합학력평가 기출 퀴즈'
    },
    'grade-2': {
      title: '고등학교 2학년',
      code: '고2',
      tagline: '수능 공통과목 핵심 심화 & 2026 9월 학평 기출',
      courses: [
        '수학 I (지수법칙과 부등식, 삼각함수 각 변환, 등비수열)',
        '수학 II (함수의 극한 0/0 부정형 계산, 다항함수의 미분법)'
      ],
      examName: '2026학년도 9월 고2 전국연합학력평가 기출 퀴즈'
    },
    'grade-3': {
      title: '고등학교 3학년',
      code: '고3',
      tagline: '수능 실전 평가원 공통과목 & 2026 수능 9월 모평 기출',
      courses: [
        '수학 I (수능 실전 지수 계산, 시그마의 성질과 수열의 합)',
        '수학 II (미분계수의 정의, 곱의 미분법, 접선의 방정식)'
      ],
      examName: '2026학년도 대학수학능력시험 9월 모의평가 기출 퀴즈'
    }
  };

  // DOM Elements - Screens
  const screens = {
    intro: document.getElementById('screen-intro'),
    login: document.getElementById('screen-login'),
    grade: document.getElementById('screen-grade'),
    dashboard: document.getElementById('screen-dashboard'),
    quiz: document.getElementById('screen-quiz'),
    quizResult: document.getElementById('screen-quiz-result'),
    photoSolver: document.getElementById('screen-photo-solver')
  };

  // DOM Elements - Forms & Nav
  const loginForm = document.getElementById('login-form');
  const inputName = document.getElementById('input-name');
  const inputPassword = document.getElementById('input-password');
  const btnGoogleLogin = document.getElementById('btn-google-login');
  const gradeCards = document.querySelectorAll('.grade-card');
  const btnConfirmGrade = document.getElementById('btn-confirm-grade');
  const userDisplayName = document.getElementById('user-display-name');
  const userInitial = document.getElementById('user-initial');
  const toastElement = document.getElementById('toast');

  // DOM Elements - Photo Solver UI
  const navBtnPhoto = document.getElementById('nav-btn-photo');
  const btnDashPhotoSolver = document.getElementById('btn-dash-photo-solver');
  const btnPhotoBackDash = document.getElementById('btn-photo-back-dash');
  const uploadDropZone = document.getElementById('upload-drop-zone');
  const photoFileInput = document.getElementById('photo-file-input');
  const cameraFileInput = document.getElementById('camera-file-input');
  const btnTriggerUpload = document.getElementById('btn-trigger-upload');
  const btnTriggerCamera = document.getElementById('btn-trigger-camera');
  const imagePreviewWrap = document.getElementById('image-preview-wrap');
  const imagePreview = document.getElementById('image-preview');
  const btnRemovePhoto = document.getElementById('btn-remove-photo');
  const photoAdditionalPrompt = document.getElementById('photo-additional-prompt');
  const btnAnalyzePhoto = document.getElementById('btn-analyze-photo');
  const photoResultCard = document.getElementById('photo-result-card');
  const photoResultContent = document.getElementById('photo-result-content');
  const photoResultStatus = document.getElementById('photo-result-status');

  // DOM Elements - AI Chatbot UI
  const btnToggleChat = document.getElementById('btn-toggle-chat');
  const btnCloseChat = document.getElementById('btn-close-chat');
  const aiChatWindow = document.getElementById('ai-chat-window');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiChatInput = document.getElementById('ai-chat-input');
  const chatChips = document.querySelectorAll('.chat-chip');

  // DOM Elements - Quiz UI
  const btnStartQuiz = document.getElementById('btn-start-quiz');
  const quizExamTag = document.getElementById('quiz-exam-tag');
  const quizGradeName = document.getElementById('quiz-grade-name');
  const quizTimerText = document.getElementById('quiz-timer-text');
  const quizCurrentNum = document.getElementById('quiz-current-num');
  const quizTotalNum = document.getElementById('quiz-total-num');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const qNumberEl = document.getElementById('q-number');
  const qPointsEl = document.getElementById('q-points');
  const qSourceEl = document.getElementById('q-source');
  const qTextEl = document.getElementById('q-text');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizExplanationBox = document.getElementById('quiz-explanation-box');
  const explanationHeader = document.getElementById('explanation-header');
  const explanationContent = document.getElementById('explanation-content');
  const btnQuizPrev = document.getElementById('btn-quiz-prev');
  const btnQuizSubmit = document.getElementById('btn-quiz-submit');
  const btnQuizNext = document.getElementById('btn-quiz-next');

  // DOM Elements - Quiz Result UI
  const resultUserName = document.getElementById('result-user-name');
  const resultScoreVal = document.getElementById('result-score-val');
  const resultMaxScore = document.getElementById('result-max-score');
  const resultEvaluationText = document.getElementById('result-evaluation-text');
  const resultAccuracy = document.getElementById('result-accuracy');
  const resultCorrectCount = document.getElementById('result-correct-count');
  const resultTimeTaken = document.getElementById('result-time-taken');
  const btnRetryWrongQuiz = document.getElementById('btn-retry-wrong-quiz');
  const btnRetryQuiz = document.getElementById('btn-retry-quiz');
  const btnGoGradeSelect = document.getElementById('btn-go-grade-select');
  const btnGoDashboard = document.getElementById('btn-go-dashboard');
  const btnFilterAll = document.getElementById('btn-filter-all');
  const btnFilterWrong = document.getElementById('btn-filter-wrong');
  const reviewListContainer = document.getElementById('review-list-container');

  // Modal elements for API Key Settings
  const modalApiKey = document.getElementById('modal-api-key');
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnSaveKeys = document.getElementById('btn-save-keys');
  const inputGoogleClientId = document.getElementById('input-google-client-id');
  const inputMathApiKey = document.getElementById('input-math-api-key');

  // ----------------------------------------------------------------------
  // Math Formula Rendering Helper (KaTeX)
  // ----------------------------------------------------------------------
  function renderMath(targetElement) {
    if (window.renderMathInElement && targetElement) {
      try {
        window.renderMathInElement(targetElement, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX render error:', err);
      }
    }
  }

  // ----------------------------------------------------------------------
  // Navigation & Screen Control
  // ----------------------------------------------------------------------
  function showScreen(screenName) {
    state.currentScreen = screenName;
    Object.keys(screens).forEach((key) => {
      if (screens[key]) {
        if (key === screenName) {
          screens[key].classList.add('active');
        } else {
          screens[key].classList.remove('active');
        }
      }
    });

    // Update screen specific UI
    if (screenName === 'grade' && state.user) {
      userDisplayName.textContent = state.user.name;
      userInitial.textContent = state.user.name.charAt(0) || 'U';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Toast Notification
  function showToast(message, duration = 3000) {
    if (!toastElement) return;
    toastElement.querySelector('.toast-msg').textContent = message;
    toastElement.classList.add('show');
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, duration);
  }

  // ----------------------------------------------------------------------
  // Local Storage & Configuration Sync
  // ----------------------------------------------------------------------
  function loadStoredConfig() {
    const savedClientId = localStorage.getItem('MATH_GOOGLE_CLIENT_ID');
    const savedApiKey = localStorage.getItem('MATH_API_KEY');

    if (savedClientId && window.APP_CONFIG) {
      window.APP_CONFIG.GOOGLE_CLIENT_ID = savedClientId;
    }
    if (savedApiKey && window.APP_CONFIG) {
      window.APP_CONFIG.MATH_API_KEY = savedApiKey;
    }

    if (inputGoogleClientId) inputGoogleClientId.value = window.APP_CONFIG ? window.APP_CONFIG.GOOGLE_CLIENT_ID : '';
    if (inputMathApiKey) inputMathApiKey.value = window.APP_CONFIG ? window.APP_CONFIG.MATH_API_KEY : '';

    // 기존 로그인 기록이 있으면 이름 입력란에 미리 채워둠 (편의 기능)
    const savedUser = localStorage.getItem('MATH_APP_USER');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (inputName && parsed && parsed.name) {
          inputName.value = parsed.name;
        }
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }

  // ----------------------------------------------------------------------
  // Splash Intro & Auto-Transition to Login Screen
  // ----------------------------------------------------------------------
  let splashTimeout = null;

  function initSplashScreen() {
    showScreen('intro');

    const splashProgressFill = document.getElementById('splash-progress-fill');
    if (splashProgressFill) {
      splashProgressFill.style.width = '0%';
      setTimeout(() => {
        splashProgressFill.style.width = '100%';
      }, 50);
    }

    // 1.8초 동안 매쓰랩 로고 시작화면을 보여준 후 로그인 창으로 자동 전환
    splashTimeout = setTimeout(() => {
      goToLoginScreen();
    }, 1800);
  }

  function goToLoginScreen() {
    if (splashTimeout) {
      clearTimeout(splashTimeout);
      splashTimeout = null;
    }
    showScreen('login');
    setTimeout(() => {
      if (inputName) inputName.focus();
    }, 150);
  }

  // ----------------------------------------------------------------------
  // Event Listeners: Navigation
  // ----------------------------------------------------------------------
  const btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      goToLoginScreen();
    });
  }

  const btnBackToIntro = document.getElementById('btn-back-to-intro');
  if (btnBackToIntro) {
    btnBackToIntro.addEventListener('click', () => {
      showScreen('intro');
    });
  }

  const btnLogoutList = document.querySelectorAll('.btn-logout-action');
  btnLogoutList.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.user = null;
      state.selectedGrade = null;
      localStorage.removeItem('MATH_APP_USER');
      localStorage.removeItem('MATH_APP_GRADE');

      gradeCards.forEach((c) => c.classList.remove('selected'));
      btnConfirmGrade.disabled = true;

      showToast('로그아웃되었습니다.');
      showScreen('login');
    });
  });

  // ----------------------------------------------------------------------
  // Standard Login (Name & Password)
  // ----------------------------------------------------------------------
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = inputName.value.trim();
      const password = inputPassword.value;

      if (!name) {
        showToast('이름을 입력해주세요.');
        inputName.focus();
        return;
      }

      if (!password) {
        showToast('비밀번호를 입력해주세요.');
        inputPassword.focus();
        return;
      }

      state.user = {
        name: name,
        loginType: 'standard',
        loginAt: new Date().toISOString()
      };
      localStorage.setItem('MATH_APP_USER', JSON.stringify(state.user));

      showToast(`환영합니다, ${name} 학생!`);
      showScreen('grade');
    });
  }

  // ----------------------------------------------------------------------
  // Google Sign-In Handler
  // ----------------------------------------------------------------------
  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', () => {
      const clientId = (window.APP_CONFIG && window.APP_CONFIG.GOOGLE_CLIENT_ID) || localStorage.getItem('MATH_GOOGLE_CLIENT_ID');

      if (!clientId) {
        const promptName = prompt(
          "【구글 로그인】\n아직 Google Client ID(아이피/인증 키)가 설정되지 않았습니다.\n(직접 추가하실 때까지 테스트용 모의 로그인으로 진행합니다.)\n\n로그인할 이름을 입력해주세요:",
          "김수학 (Google)"
        );

        if (promptName && promptName.trim()) {
          state.user = {
            name: promptName.trim(),
            loginType: 'google',
            email: 'student@gmail.com',
            loginAt: new Date().toISOString()
          };
          localStorage.setItem('MATH_APP_USER', JSON.stringify(state.user));
          showToast(`구글 계정으로 로그인되었습니다! (${state.user.name})`);
          showScreen('grade');
        }
      } else {
        showToast('Google OAuth 연동을 시작합니다...');
      }
    });
  }

  // ----------------------------------------------------------------------
  // Grade Selection (고1, 고2, 고3)
  // ----------------------------------------------------------------------
  gradeCards.forEach((card) => {
    card.addEventListener('click', () => {
      gradeCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const selectedId = card.getAttribute('data-grade');
      state.selectedGrade = selectedId;

      btnConfirmGrade.disabled = false;
      btnConfirmGrade.classList.remove('opacity-50', 'cursor-not-allowed');

      const data = gradeData[selectedId];
      if (data) {
        showToast(`${data.title}이 선택되었습니다.`);
      }
    });
  });

  if (btnConfirmGrade) {
    btnConfirmGrade.addEventListener('click', () => {
      if (!state.selectedGrade) {
        showToast('학년을 먼저 선택해주세요.');
        return;
      }

      localStorage.setItem('MATH_APP_GRADE', state.selectedGrade);
      showDashboardView(state.selectedGrade);
      showScreen('dashboard');
    });
  }

  // Dashboard preview UI builder
  function showDashboardView(gradeKey) {
    const data = gradeData[gradeKey];
    if (!data) return;

    const studentNameEl = document.getElementById('dash-student-name');
    const selectedGradeEl = document.getElementById('dash-selected-grade');
    const coursesListEl = document.getElementById('dash-courses-list');
    const gradeTaglineEl = document.getElementById('dash-grade-tagline');
    const dashQuizTitle = document.getElementById('dash-quiz-title');

    if (studentNameEl && state.user) studentNameEl.textContent = state.user.name;
    if (selectedGradeEl) selectedGradeEl.textContent = data.title;
    if (gradeTaglineEl) gradeTaglineEl.textContent = data.tagline;
    if (dashQuizTitle) dashQuizTitle.textContent = data.examName;

    if (coursesListEl) {
      coursesListEl.innerHTML = '';
      data.courses.forEach((course) => {
        const li = document.createElement('li');
        li.className = 'subject-item';
        li.style.fontSize = '0.95rem';
        li.style.padding = '0.4rem 0';
        li.innerHTML = `<span class="subject-bullet" style="color:#10b981;">✓</span> <strong>${course}</strong>`;
        coursesListEl.appendChild(li);
      });
    }
  }

  const btnChangeGrade = document.getElementById('btn-change-grade');
  if (btnChangeGrade) {
    btnChangeGrade.addEventListener('click', () => {
      showScreen('grade');
    });
  }

  // ----------------------------------------------------------------------
  // Mock Exam Quiz Controller Logic
  // ----------------------------------------------------------------------
  function startQuiz(gradeKey, customQuestions = null, isWrongOnly = false, isVariation = false) {
    if (!customQuestions && (!window.QUIZ_DATA || !window.QUIZ_DATA[gradeKey])) {
      showToast('해당 학년의 퀴즈 데이터를 찾을 수 없습니다.');
      return;
    }

    const quizPack = window.QUIZ_DATA[gradeKey];
    quizState.gradeKey = gradeKey;
    quizState.isWrongOnlyMode = isWrongOnly;
    quizState.isVariationMode = isVariation;
    quizState.questions = customQuestions ? customQuestions : quizPack.questions;
    quizState.currentIndex = 0;
    quizState.userAnswers = new Array(quizState.questions.length).fill(null);
    quizState.submittedStatus = new Array(quizState.questions.length).fill(false);
    quizState.timerSeconds = 0;

    // Reset timer
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    quizState.timerInterval = setInterval(() => {
      quizState.timerSeconds++;
      const mins = String(Math.floor(quizState.timerSeconds / 60)).padStart(2, '0');
      const secs = String(quizState.timerSeconds % 60).padStart(2, '0');
      if (quizTimerText) quizTimerText.textContent = `${mins}:${secs}`;
    }, 1000);

    // Setup Header Info
    if (quizState.isVariationMode) {
      if (quizExamTag) quizExamTag.textContent = '🧬 쌍둥이 변형 문제 복습';
      if (quizGradeName) quizGradeName.textContent = (gradeData[gradeKey] ? gradeData[gradeKey].code : '') + ' 실전 변형';
      showToast(`틀렸던 ${quizState.questions.length}문항의 쌍둥이 변형 문제로 실력을 다집니다!`);
    } else if (quizState.isWrongOnlyMode) {
      if (quizExamTag) quizExamTag.textContent = '🔥 오답 집중 복습 퀴즈';
      if (quizGradeName) quizGradeName.textContent = (gradeData[gradeKey] ? gradeData[gradeKey].code : '') + ' 오답 노트';
      showToast(`틀렸던 ${quizState.questions.length}문제를 다시 풀어봅니다! 파이팅!`);
    } else {
      if (quizExamTag) quizExamTag.textContent = gradeKey === 'grade-3' ? '2026 수능 9월 모평' : '2026년 9월 학평';
      if (quizGradeName) quizGradeName.textContent = quizPack ? quizPack.gradeTitle : '모의고사';
    }
    if (quizTotalNum) quizTotalNum.textContent = quizState.questions.length;

    renderCurrentQuestion();
    showScreen('quiz');
  }

  // Render question at currentIndex
  function renderCurrentQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    const total = quizState.questions.length;
    const isSubmitted = quizState.submittedStatus[quizState.currentIndex];
    const selectedOption = quizState.userAnswers[quizState.currentIndex];

    // Numbers & Progress
    if (quizCurrentNum) quizCurrentNum.textContent = quizState.currentIndex + 1;
    if (qNumberEl) qNumberEl.textContent = quizState.currentIndex + 1;
    if (qPointsEl) qPointsEl.textContent = `[${q.points}점]`;
    if (qSourceEl) qSourceEl.textContent = q.source;
    if (quizProgressBar) {
      const progressPercent = ((quizState.currentIndex + 1) / total) * 100;
      quizProgressBar.style.width = `${progressPercent}%`;
    }

    // Question Text
    if (qTextEl) {
      qTextEl.innerHTML = q.question;
      renderMath(qTextEl);
    }

    // Options Rendering
    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = '';
      const numSymbols = ['①', '②', '③', '④', '⑤'];

      q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';

        if (selectedOption === idx) {
          btn.classList.add('selected');
        }

        // If this question was already submitted, show color coding
        if (isSubmitted) {
          btn.disabled = true;
          if (idx === q.answer) {
            btn.classList.add('correct');
          } else if (selectedOption === idx && idx !== q.answer) {
            btn.classList.add('incorrect');
          }
        } else {
          // Option click handler
          btn.addEventListener('click', () => {
            selectOption(idx);
          });
        }

        btn.innerHTML = `
          <div class="quiz-option-num">${numSymbols[idx] || idx + 1}</div>
          <div class="quiz-option-content">$$${optText}$$</div>
        `;
        quizOptionsContainer.appendChild(btn);
      });

      renderMath(quizOptionsContainer);
    }

    // Explanation Box
    if (quizExplanationBox) {
      if (isSubmitted) {
        quizExplanationBox.className = 'quiz-explanation-box show';
        const isCorrect = selectedOption === q.answer;

        if (isCorrect) {
          quizExplanationBox.classList.add('correct');
          explanationHeader.className = 'explanation-header correct-text';
          explanationHeader.innerHTML = '<span>🎉 정답입니다! (+ ' + q.points + '점)</span>';
        } else {
          quizExplanationBox.classList.add('incorrect');
          explanationHeader.className = 'explanation-header incorrect-text';
          const numSymbols = ['①', '②', '③', '④', '⑤'];
          explanationHeader.innerHTML = `<span>❌ 아쉽네요, 오답입니다. (정답: ${numSymbols[q.answer]})</span>`;
        }

        explanationContent.innerHTML = q.explanation;
        renderMath(explanationContent);
      } else {
        quizExplanationBox.className = 'quiz-explanation-box';
      }
    }

    // Footer Navigation Controls
    if (btnQuizPrev) {
      btnQuizPrev.disabled = quizState.currentIndex === 0;
      btnQuizPrev.style.opacity = quizState.currentIndex === 0 ? '0.5' : '1';
    }

    if (btnQuizSubmit) {
      if (isSubmitted) {
        btnQuizSubmit.style.display = 'none';
      } else {
        btnQuizSubmit.style.display = 'inline-flex';
        btnQuizSubmit.disabled = selectedOption === null;
        btnQuizSubmit.style.opacity = selectedOption === null ? '0.6' : '1';
      }
    }

    if (btnQuizNext) {
      const isLast = quizState.currentIndex === total - 1;
      const nextSpan = btnQuizNext.querySelector('span');
      if (nextSpan) {
        nextSpan.textContent = isLast ? '결과 확인 🏆' : '다음 문제';
      }
    }
  }

  // Select an option for current question
  function selectOption(optionIndex) {
    if (quizState.submittedStatus[quizState.currentIndex]) return;

    quizState.userAnswers[quizState.currentIndex] = optionIndex;
    const optionBtns = quizOptionsContainer.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach((btn, idx) => {
      if (idx === optionIndex) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    if (btnQuizSubmit) {
      btnQuizSubmit.disabled = false;
      btnQuizSubmit.style.opacity = '1';
    }
  }

  // Submit Answer & Reveal Explanation
  function submitAnswer() {
    const currentAns = quizState.userAnswers[quizState.currentIndex];
    if (currentAns === null) {
      showToast('정답 보기를 먼저 선택해주세요.');
      return;
    }

    quizState.submittedStatus[quizState.currentIndex] = true;
    renderCurrentQuestion();

    const q = quizState.questions[quizState.currentIndex];
    if (currentAns === q.answer) {
      showToast(`정답입니다! (+${q.points}점)`);
    } else {
      showToast('오답입니다. 해설을 확인해보세요.');
    }
  }

  // Quiz Next / Finish Handler
  function handleNextQuestion() {
    const total = quizState.questions.length;

    // If answer not submitted yet, warn or auto-submit
    if (!quizState.submittedStatus[quizState.currentIndex] && quizState.userAnswers[quizState.currentIndex] !== null) {
      submitAnswer();
      return;
    }

    if (quizState.currentIndex < total - 1) {
      quizState.currentIndex++;
      renderCurrentQuestion();
    } else {
      // Finished all questions -> Show Results
      finishQuiz();
    }
  }

  // Finish Quiz and Render Result Screen
  function finishQuiz() {
    if (quizState.timerInterval) {
      clearInterval(quizState.timerInterval);
      quizState.timerInterval = null;
    }

    const questions = quizState.questions;
    let earnedPoints = 0;
    let maxPoints = 0;
    let correctCount = 0;
    const wrongList = [];

    questions.forEach((q, idx) => {
      maxPoints += q.points;
      if (quizState.userAnswers[idx] === q.answer) {
        earnedPoints += q.points;
        correctCount++;
      } else {
        wrongList.push(q);
      }
    });

    quizState.lastWrongQuestions = wrongList;

    const accuracyRate = Math.round((correctCount / questions.length) * 100);
    const mins = String(Math.floor(quizState.timerSeconds / 60)).padStart(2, '0');
    const secs = String(quizState.timerSeconds % 60).padStart(2, '0');

    // Populate Result Elements
    if (resultUserName && state.user) resultUserName.textContent = state.user.name;
    if (resultScoreVal) resultScoreVal.textContent = earnedPoints;
    if (resultMaxScore) resultMaxScore.textContent = maxPoints;
    if (resultAccuracy) resultAccuracy.textContent = `${accuracyRate}%`;
    if (resultCorrectCount) resultCorrectCount.textContent = `${correctCount} / ${questions.length}문항`;
    if (resultTimeTaken) resultTimeTaken.textContent = `${mins}:${secs}`;

    // Evaluation text based on score
    if (resultEvaluationText) {
      if (accuracyRate === 100) {
        resultEvaluationText.textContent = '🎉 완벽합니다! 전 문항 만점을 달성하셨습니다!';
      } else if (accuracyRate >= 80) {
        resultEvaluationText.textContent = '👏 아주 우수합니다! 모의고사 1~2등급 수준의 실력입니다.';
      } else if (accuracyRate >= 60) {
        resultEvaluationText.textContent = '👍 좋은 출발입니다! 아래 오답 노트를 꼼꼼히 복습해보세요.';
      } else {
        resultEvaluationText.textContent = '💪 핵심 개념을 다시 한번 복습하고 재도전해보세요!';
      }
    }

    // "오답만 다시 풀기" 버튼 제어 -> 쌍둥이 변형 문제로 복습
    if (btnRetryWrongQuiz) {
      if (wrongList.length > 0) {
        btnRetryWrongQuiz.style.display = 'inline-flex';
        btnRetryWrongQuiz.querySelector('span').textContent = `🧬 틀린 문제 쌍둥이 변형 문제로 복습 (${wrongList.length}문항)`;
      } else {
        btnRetryWrongQuiz.style.display = 'none';
      }
    }

    // 초기 리뷰 리스트 렌더링 (기본: 전체 문항)
    if (btnFilterAll) btnFilterAll.classList.add('active');
    if (btnFilterWrong) btnFilterWrong.classList.remove('active');
    renderReviewItems('all');

    showScreen('quizResult');
  }

  // Render Review List by Filter ('all' or 'wrong')
  function renderReviewItems(filterMode = 'all') {
    if (!reviewListContainer) return;
    reviewListContainer.innerHTML = '';

    const questions = quizState.questions;
    const numSymbols = ['①', '②', '③', '④', '⑤'];
    let renderedCount = 0;

    questions.forEach((q, idx) => {
      const userChoice = quizState.userAnswers[idx];
      const isCorrect = userChoice === q.answer;

      if (filterMode === 'wrong' && isCorrect) {
        return; // Skip correct ones in wrong-only filter
      }

      renderedCount++;
      const item = document.createElement('div');
      item.className = 'review-item';
      item.innerHTML = `
        <div class="review-item-header">
          <div style="font-weight: 700; color: #0f172a;">
            문제 ${idx + 1}번 <span style="font-size: 0.85rem; color: #64748b; font-weight: normal;">(${q.source})</span>
          </div>
          <span class="review-item-status ${isCorrect ? 'pass' : 'fail'}">
            ${isCorrect ? '✓ 정답 (+ ' + q.points + '점)' : '✗ 오답 (0점)'}
          </span>
        </div>
        <div style="font-size: 0.95rem; color: #1e293b; margin-bottom: 0.75rem;">
          ${q.question}
        </div>
        <div style="font-size: 0.875rem; color: #475569; margin-bottom: 0.5rem; background: #ffffff; padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid #e2e8f0;">
          <strong>내 선택:</strong> ${userChoice !== null ? numSymbols[userChoice] : '미선택'} &nbsp;|&nbsp; 
          <strong style="color: #10b981;">정답:</strong> ${numSymbols[q.answer]}
        </div>
        <div style="font-size: 0.875rem; color: #334155; line-height: 1.6; white-space: pre-line; background: #f1f5f9; padding: 0.75rem; border-radius: 8px;">
          <strong>[상세 해설]</strong>\n${q.explanation}
        </div>
      `;
      reviewListContainer.appendChild(item);
    });

    if (renderedCount === 0 && filterMode === 'wrong') {
      reviewListContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: #15803d; background: #f0fdf4; border-radius: 12px; border: 1px dashed #86efac;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
          <strong>틀린 문제가 없습니다! 모든 문제를 완벽하게 맞히셨습니다.</strong>
        </div>
      `;
    }

    renderMath(reviewListContainer);
  }

  // ----------------------------------------------------------------------
  // Event Listeners: Quiz UI
  // ----------------------------------------------------------------------
  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', () => {
      if (!state.selectedGrade) {
        showToast('먼저 학년을 선택해주세요.');
        showScreen('grade');
        return;
      }
      startQuiz(state.selectedGrade);
    });
  }

  if (btnQuizSubmit) {
    btnQuizSubmit.addEventListener('click', submitAnswer);
  }

  if (btnQuizNext) {
    btnQuizNext.addEventListener('click', handleNextQuestion);
  }

  if (btnQuizPrev) {
    btnQuizPrev.addEventListener('click', () => {
      if (quizState.currentIndex > 0) {
        quizState.currentIndex--;
        renderCurrentQuestion();
      }
    });
  }

  // Result Actions: 틀린 문제를 쌍둥이 변형 문제로 복습
  if (btnRetryWrongQuiz) {
    btnRetryWrongQuiz.addEventListener('click', () => {
      if (quizState.lastWrongQuestions && quizState.lastWrongQuestions.length > 0) {
        // 틀린 문제의 쌍둥이 변형 문제(variation) 추출
        const variationQuestions = quizState.lastWrongQuestions.map(q => q.variation || q);
        startQuiz(quizState.gradeKey || state.selectedGrade || 'grade-1', variationQuestions, true, true);
      } else {
        showToast('틀린 문제가 없습니다!');
      }
    });
  }

  if (btnRetryQuiz) {
    btnRetryQuiz.addEventListener('click', () => {
      startQuiz(quizState.gradeKey || state.selectedGrade || 'grade-1');
    });
  }

  // Filter Buttons
  if (btnFilterAll) {
    btnFilterAll.addEventListener('click', () => {
      btnFilterAll.classList.add('active');
      if (btnFilterWrong) btnFilterWrong.classList.remove('active');
      renderReviewItems('all');
    });
  }

  if (btnFilterWrong) {
    btnFilterWrong.addEventListener('click', () => {
      btnFilterWrong.classList.add('active');
      if (btnFilterAll) btnFilterAll.classList.remove('active');
      renderReviewItems('wrong');
    });
  }

  if (btnGoGradeSelect) {
    btnGoGradeSelect.addEventListener('click', () => {
      showScreen('grade');
    });
  }

  if (btnGoDashboard) {
    btnGoDashboard.addEventListener('click', () => {
      showDashboardView(state.selectedGrade || 'grade-1');
      showScreen('dashboard');
    });
  }

  // ----------------------------------------------------------------------
  // API Key Settings Modal Handler
  // ----------------------------------------------------------------------
  function openModal() {
    if (modalApiKey) modalApiKey.classList.add('open');
  }

  function closeModal() {
    if (modalApiKey) modalApiKey.classList.remove('open');
  }

  if (btnOpenSettings) btnOpenSettings.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  if (modalApiKey) {
    modalApiKey.addEventListener('click', (e) => {
      if (e.target === modalApiKey) closeModal();
    });
  }

  if (btnSaveKeys) {
    btnSaveKeys.addEventListener('click', () => {
      const gClient = inputGoogleClientId.value.trim();
      const mathKey = inputMathApiKey.value.trim();

      localStorage.setItem('MATH_GOOGLE_CLIENT_ID', gClient);
      localStorage.setItem('MATH_API_KEY', mathKey);

      if (window.APP_CONFIG) {
        window.APP_CONFIG.GOOGLE_CLIENT_ID = gClient;
        window.APP_CONFIG.MATH_API_KEY = mathKey;
      }

      closeModal();
      showToast('API 키 설정이 안전하게 브라우저에 저장되었습니다!');
    });
  }

  // ----------------------------------------------------------------------
  // Markdown & Text Formatter Helper
  // ----------------------------------------------------------------------
  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/^### (.*$)/gim, '<h3 style="font-size:1.15rem; font-weight:700; margin:0.8rem 0 0.4rem 0;">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 style="font-size:1.05rem; font-weight:700; color:#4f46e5; margin:0.6rem 0 0.3rem 0;">$1</h4>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
  }

  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ----------------------------------------------------------------------
  // Photo Solver Logic (사진 업로드 / 촬영 풀이)
  // ----------------------------------------------------------------------
  let currentPhotoDataUrl = null;

  if (navBtnPhoto) {
    navBtnPhoto.addEventListener('click', () => {
      showScreen('photoSolver');
    });
  }

  if (btnDashPhotoSolver) {
    btnDashPhotoSolver.addEventListener('click', () => {
      showScreen('photoSolver');
    });
  }

  if (btnPhotoBackDash) {
    btnPhotoBackDash.addEventListener('click', () => {
      if (state.user) {
        showScreen('dashboard');
      } else {
        showScreen('intro');
      }
    });
  }

  if (btnTriggerUpload) {
    btnTriggerUpload.addEventListener('click', (e) => {
      e.stopPropagation();
      if (photoFileInput) photoFileInput.click();
    });
  }

  if (btnTriggerCamera) {
    btnTriggerCamera.addEventListener('click', (e) => {
      e.stopPropagation();
      if (cameraFileInput) cameraFileInput.click();
    });
  }

  if (uploadDropZone) {
    uploadDropZone.addEventListener('click', (e) => {
      if (e.target !== btnTriggerCamera && photoFileInput) {
        photoFileInput.click();
      }
    });

    uploadDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadDropZone.classList.add('dragover');
    });

    uploadDropZone.addEventListener('dragleave', () => {
      uploadDropZone.classList.remove('dragover');
    });

    uploadDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadDropZone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handlePhotoFile(e.dataTransfer.files[0]);
      }
    });
  }

  if (photoFileInput) {
    photoFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handlePhotoFile(e.target.files[0]);
      }
    });
  }

  if (cameraFileInput) {
    cameraFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handlePhotoFile(e.target.files[0]);
      }
    });
  }

  function handlePhotoFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('이미지 파일(JPG, PNG 등)만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentPhotoDataUrl = e.target.result;
      if (imagePreview) imagePreview.src = currentPhotoDataUrl;
      if (imagePreviewWrap) imagePreviewWrap.classList.add('show');
      if (btnAnalyzePhoto) btnAnalyzePhoto.disabled = false;
      showToast('사진이 업로드되었습니다! 해설 분석 버튼을 눌러주세요.');
    };
    reader.readAsDataURL(file);
  }

  if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener('click', () => {
      currentPhotoDataUrl = null;
      if (imagePreview) imagePreview.src = '';
      if (imagePreviewWrap) imagePreviewWrap.classList.remove('show');
      if (btnAnalyzePhoto) btnAnalyzePhoto.disabled = true;
      if (photoFileInput) photoFileInput.value = '';
      if (cameraFileInput) cameraFileInput.value = '';
      if (photoResultCard) photoResultCard.classList.remove('show');
    });
  }

  if (btnAnalyzePhoto) {
    btnAnalyzePhoto.addEventListener('click', async () => {
      if (!currentPhotoDataUrl) {
        showToast('먼저 문제 사진을 업로드해주세요.');
        return;
      }

      btnAnalyzePhoto.disabled = true;
      const originalBtnText = btnAnalyzePhoto.querySelector('span').textContent;
      btnAnalyzePhoto.querySelector('span').textContent = '🤖 AI가 문제와 수식을 분석 중입니다...';

      if (photoResultCard) photoResultCard.classList.add('show');
      if (photoResultStatus) {
        photoResultStatus.textContent = '분석 진행 중...';
        photoResultStatus.style.background = '#fef3c7';
        photoResultStatus.style.color = '#b45309';
      }
      if (photoResultContent) {
        photoResultContent.innerHTML = '<div style="text-align:center; padding:1.5rem;"><div style="font-size:2rem; animation: float 1.5s infinite;">🧠</div>AI가 사진 속 수식과 개념을 판독하고 있습니다...</div>';
      }

      const prompt = photoAdditionalPrompt ? photoAdditionalPrompt.value.trim() : '';
      const solution = await window.GeminiService.solveMathImage(currentPhotoDataUrl, prompt);

      if (photoResultStatus) {
        photoResultStatus.textContent = '분석 완료';
        photoResultStatus.style.background = '#dcfce7';
        photoResultStatus.style.color = '#15803d';
      }

      if (photoResultContent) {
        photoResultContent.innerHTML = formatMarkdown(solution);
        renderMath(photoResultContent);
      }

      btnAnalyzePhoto.disabled = false;
      btnAnalyzePhoto.querySelector('span').textContent = originalBtnText;
      photoResultCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----------------------------------------------------------------------
  // AI 수학 튜터 채팅 로직 (AI Chatbot Widget)
  // ----------------------------------------------------------------------
  let chatHistory = [];

  if (btnToggleChat) {
    btnToggleChat.addEventListener('click', () => {
      if (aiChatWindow) {
        aiChatWindow.classList.toggle('open');
        if (aiChatWindow.classList.contains('open') && aiChatInput) {
          aiChatInput.focus();
        }
      }
    });
  }

  if (btnCloseChat) {
    btnCloseChat.addEventListener('click', () => {
      if (aiChatWindow) aiChatWindow.classList.remove('open');
    });
  }

  if (chatChips) {
    chatChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query && aiChatInput) {
          aiChatInput.value = query;
          sendChatMessage();
        }
      });
    });
  }

  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendChatMessage();
    });
  }

  async function sendChatMessage() {
    if (!aiChatInput) return;
    const text = aiChatInput.value.trim();
    if (!text) return;

    // Append user message
    appendChatBubble(text, 'user');
    aiChatInput.value = '';

    // Append typing indicator
    const typingBubble = appendChatBubble('AI 튜터가 생각 중입니다... ✍️', 'bot');

    chatHistory.push({ role: 'user', text: text });
    const reply = await window.GeminiService.askMathTutor(chatHistory);
    chatHistory.push({ role: 'model', text: reply });

    // Update typing bubble with answer
    typingBubble.innerHTML = formatMarkdown(reply);
    renderMath(typingBubble);

    if (aiChatMessages) {
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }
  }

  function appendChatBubble(text, type) {
    if (!aiChatMessages) return null;
    const div = document.createElement('div');
    div.className = `chat-bubble ${type}`;
    div.innerHTML = type === 'user' ? escapeHtml(text) : text;
    aiChatMessages.appendChild(div);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    return div;
  }

  // Initial Load: 매쓰랩 로고 시작화면(Splash)을 띄우고 로그인 창으로 순차 전환
  loadStoredConfig();
  initSplashScreen();
})();
