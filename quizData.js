/**
 * ==============================================================================
 * [모의고사 기반 학년별 수학 퀴즈 & 쌍둥이 변형 문제 데이터]
 * 2026학년도 9월 전국연합학력평가 및 수능 9월 모의평가 기출 문제 반영
 * 각 문항마다 오답 복습용 '쌍둥이 변형 문제(variation)' 완비
 * ==============================================================================
 */

const QUIZ_DATA = {
  'grade-1': {
    gradeTitle: '고등학교 1학년',
    examTitle: '2026학년도 9월 고1 전국연합학력평가 기출 퀴즈',
    description: '공통수학 전 범위 핵심 개념(다항식, 복소수, 항등식, 부등식, 조합)을 테스트합니다.',
    questions: [
      {
        id: 1,
        source: '2026년 9월 고1 학평 1번',
        points: 2,
        question: '두 다항식 $$A = 3x^2 - 2x + 5$$, $$B = x^2 + 3x - 4$$에 대하여 $$A + B$$를 간단히 하면?',
        options: [
          '2x^2 - x + 1',
          '2x^2 + x - 1',
          '4x^2 + x + 1',
          '4x^2 + x + 2',
          '4x^2 + 2x + 1'
        ],
        answer: 2, // 3번
        explanation: '$$A + B = (3x^2 - 2x + 5) + (x^2 + 3x - 4)$$\n동류항끼리 묶어 계산하면:\n$$= (3+1)x^2 + (-2+3)x + (5-4) = 4x^2 + x + 1$$ 입니다.',
        variation: {
          id: 101,
          source: '1번 쌍둥이 변형 문제',
          points: 2,
          question: '두 다항식 $$A = 2x^2 + 5x - 3$$, $$B = 3x^2 - 2x + 7$$에 대하여 $$A + B$$를 간단히 하면?',
          options: [
            '5x^2 + 3x + 4',
            '5x^2 - 3x + 4',
            '5x^2 + 3x - 4',
            'x^2 + 7x - 10',
            '5x^2 + 7x + 4'
          ],
          answer: 0,
          explanation: '동류항끼리 묶어 계산합니다:\n$$A + B = (2+3)x^2 + (5-2)x + (-3+7) = 5x^2 + 3x + 4$$ 입니다.'
        }
      },
      {
        id: 2,
        source: '2026년 9월 고1 학평 2번',
        points: 2,
        question: '복소수 $$z = 4 + i$$의 켤레복소수가 $$\\bar{z}$$일 때, $$z + \\bar{z}$$의 값은? (단, $$i = \\sqrt{-1}$$)',
        options: [
          '-8',
          '-4',
          '0',
          '4',
          '8'
        ],
        answer: 4, // 5번
        explanation: '복소수 $$z = a + bi$$의 켤레복소수는 $$\\bar{z} = a - bi$$입니다.\n$$z = 4 + i$$이므로 $$\\bar{z} = 4 - i$$가 됩니다.\n따라서 $$z + \\bar{z} = (4 + i) + (4 - i) = 8$$ 입니다.',
        variation: {
          id: 102,
          source: '2번 쌍둥이 변형 문제',
          points: 2,
          question: '복소수 $$z = 5 - 3i$$의 켤레복소수가 $$\\bar{z}$$일 때, $$z + \\bar{z}$$의 값은? (단, $$i = \\sqrt{-1}$$)',
          options: [
            '-6',
            '0',
            '6',
            '10',
            '16'
          ],
          answer: 3,
          explanation: '$$z = 5 - 3i$$의 켤레복소수는 허수부분의 부호를 바꾼 $$\\bar{z} = 5 + 3i$$입니다.\n따라서 $$z + \\bar{z} = (5 - 3i) + (5 + 3i) = 10$$ 입니다.'
        }
      },
      {
        id: 3,
        source: '2026년 9월 고1 학평 4번',
        points: 3,
        question: '등식 $$x^2 + ax + 18 = (x+9)(x+b)$$가 $$x$$에 대한 항등식일 때, 두 상수 $$a, b$$에 대하여 $$a \\times b$$의 값은?',
        options: [
          '18',
          '20',
          '22',
          '24',
          '26'
        ],
        answer: 2, // 3번
        explanation: '우변을 전개하면:\n$$(x+9)(x+b) = x^2 + (9+b)x + 9b$$\n이 식이 $$x^2 + ax + 18$$과 항등식이므로 양변의 계수를 비교합니다.\n1) 상수항: $$9b = 18 \\implies b = 2$$\n2) 일차항: $$a = 9 + b = 9 + 2 = 11$$\n따라서 $$a \\times b = 11 \\times 2 = 22$$ 입니다.',
        variation: {
          id: 103,
          source: '4번 쌍둥이 변형 문제',
          points: 3,
          question: '등식 $$x^2 + ax + 24 = (x+8)(x+b)$$가 $$x$$에 대한 항등식일 때, 두 상수 $$a, b$$에 대하여 $$a \\times b$$의 값은?',
          options: [
            '24',
            '28',
            '30',
            '33',
            '36'
          ],
          answer: 3,
          explanation: '우변을 전개하면 $$x^2 + (8+b)x + 8b$$ 입니다.\n상수항 비교: $$8b = 24 \\implies b = 3$$\n일차항 계수 비교: $$a = 8 + b = 8 + 3 = 11$$\n따라서 $$a \\times b = 11 \\times 3 = 33$$ 입니다.'
        }
      },
      {
        id: 4,
        source: '2026년 9월 고1 학평 6번',
        points: 3,
        question: '$$x$$에 대한 이차부등식 $$x^2 + ax - 6 \\le 0$$의 해가 $$-3 \\le x \\le b$$일 때, 두 상수 $$a, b$$에 대하여 $$2a + b$$의 값은?',
        options: [
          '1',
          '2',
          '3',
          '4',
          '5'
        ],
        answer: 3, // 4번
        explanation: '이차부등식 $$x^2 + ax - 6 \\le 0$$의 경계값은 이차방정식 $$x^2 + ax - 6 = 0$$의 두 실근과 같습니다.\n두 근이 $$-3$$과 $$b$$이므로 근과 계수의 관계를 적용합니다.\n두 근의 곱: $$(-3) \\times b = -6 \\implies b = 2$$\n두 근의 합: $$-3 + b = -3 + 2 = -1 = -a \\implies a = 1$$\n따라서 $$2a + b = 2(1) + 2 = 4$$ 입니다.',
        variation: {
          id: 104,
          source: '6번 쌍둥이 변형 문제',
          points: 3,
          question: '$$x$$에 대한 이차부등식 $$x^2 + ax - 10 \\le 0$$의 해가 $$-5 \\le x \\le b$$일 때, 두 상수 $$a, b$$에 대하여 $$a + 2b$$의 값은?',
          options: [
            '5',
            '6',
            '7',
            '8',
            '9'
          ],
          answer: 2,
          explanation: '이차방정식 $$x^2 + ax - 10 = 0$$의 두 근이 $$-5$$와 $$b$$입니다.\n두 근의 곱: $$(-5) \\times b = -10 \\implies b = 2$$\n두 근의 합: $$-5 + 2 = -3 = -a \\implies a = 3$$\n따라서 $$a + 2b = 3 + 2(2) = 7$$ 입니다.'
        }
      },
      {
        id: 5,
        source: '2026년 9월 고1 학평 22번',
        points: 3,
        question: '조합과 순열의 값 $${}_{3}\\mathrm{C}_{1} + {}_{5}\\mathrm{P}_{2}$$를 계산한 값은?',
        options: [
          '17',
          '20',
          '23',
          '26',
          '29'
        ],
        answer: 2, // 3번
        explanation: '1) $${}_{3}\\mathrm{C}_{1} = 3$$\n2) $${}_{5}\\mathrm{P}_{2} = 5 \\times 4 = 20$$\n따라서 두 값의 합은 $$3 + 20 = 23$$ 입니다.',
        variation: {
          id: 105,
          source: '22번 쌍둥이 변형 문제',
          points: 3,
          question: '순열과 조합의 값 $${}_{4}\\mathrm{C}_{2} + {}_{4}\\mathrm{P}_{2}$$를 계산한 값은?',
          options: [
            '14',
            '16',
            '18',
            '20',
            '22'
          ],
          answer: 2,
          explanation: '1) $${}_{4}\\mathrm{C}_{2} = \\frac{4 \\times 3}{2 \\times 1} = 6$$\n2) $${}_{4}\\mathrm{P}_{2} = 4 \\times 3 = 12$$\n따라서 $$6 + 12 = 18$$ 입니다.'
        }
      }
    ]
  },

  'grade-2': {
    gradeTitle: '고등학교 2학년',
    examTitle: '2026학년도 9월 고2 전국연합학력평가 기출 퀴즈',
    description: '수학I(지수·로그, 삼각함수, 수열)과 수학II(함수의 극한) 모의고사 기출 문제입니다.',
    questions: [
      {
        id: 1,
        source: '2026년 9월 고2 학평 1번',
        points: 2,
        question: '지수법칙 계산 $$\\left(2^{\\frac{1}{3}}\\right)^6$$의 값은?',
        options: [
          '1',
          '2',
          '4',
          '8',
          '16'
        ],
        answer: 2, // 3번
        explanation: '지수법칙 $$(a^m)^n = a^{m \\times n}$$에 의하여:\n$$\\left(2^{\\frac{1}{3}}\\right)^6 = 2^{\\frac{1}{3} \\times 6} = 2^2 = 4$$ 입니다.',
        variation: {
          id: 201,
          source: '1번 쌍둥이 변형 문제',
          points: 2,
          question: '지수법칙 계산 $$\\left(3^{\\frac{1}{2}}\\right)^4$$의 값은?',
          options: [
            '3',
            '6',
            '9',
            '12',
            '27'
          ],
          answer: 2,
          explanation: '지수법칙 $$\\left(3^{1/2}\\right)^4 = 3^{(1/2 \\times 4)} = 3^2 = 9$$ 입니다.'
        }
      },
      {
        id: 2,
        source: '2026년 9월 고2 학평 2번',
        points: 2,
        question: '함수의 극한 $$\\lim_{x \\to 3} \\frac{x^2 - x - 6}{x - 3}$$의 값은?',
        options: [
          '1',
          '2',
          '3',
          '4',
          '5'
        ],
        answer: 4, // 5번
        explanation: '분자를 인수분해하면 $$x^2 - x - 6 = (x - 3)(x + 2)$$ 입니다.\n$$x \\to 3$$일 때 $$(x-3)$$을 약분하면:\n$$\\lim_{x \\to 3} \\frac{(x - 3)(x + 2)}{x - 3} = \\lim_{x \\to 3} (x + 2) = 3 + 2 = 5$$ 입니다.',
        variation: {
          id: 202,
          source: '2번 쌍둥이 변형 문제',
          points: 2,
          question: '함수의 극한 $$\\lim_{x \\to 2} \\frac{x^2 + x - 6}{x - 2}$$의 값은?',
          options: [
            '1',
            '3',
            '5',
            '7',
            '9'
          ],
          answer: 2,
          explanation: '분자를 인수분해하면 $$x^2 + x - 6 = (x - 2)(x + 3)$$ 입니다.\n$$\\lim_{x \\to 2} \\frac{(x-2)(x+3)}{x-2} = \\lim_{x \\to 2} (x+3) = 2 + 3 = 5$$ 입니다.'
        }
      },
      {
        id: 3,
        source: '2026년 9월 고2 학평 3번',
        points: 2,
        question: '등비수열 $${a_n}$$에 대하여 $$a_1 = 2$$, $$a_2 a_3 = 48$$일 때, $$\\frac{a_5}{a_2}$$의 값은?',
        options: [
          '8',
          '10',
          '12',
          '14',
          '16'
        ],
        answer: 2, // 3번
        explanation: '공비를 $$r$$이라 하면 $$a_2 = 2r$$, $$a_3 = 2r^2$$ 입니다.\n$$a_2 a_3 = (2r)(2r^2) = 4r^3 = 48 \\implies r^3 = 12$$\n구하는 값은 $$\\frac{a_5}{a_2} = \\frac{a_1 r^4}{a_1 r} = r^3 = 12$$ 입니다.',
        variation: {
          id: 203,
          source: '3번 쌍둥이 변형 문제',
          points: 2,
          question: '등비수열 $${a_n}$$에 대하여 $$a_1 = 3$$, $$a_2 a_3 = 81$$일 때, $$\\frac{a_6}{a_3}$$의 값은?',
          options: [
            '3',
            '6',
            '9',
            '12',
            '27'
          ],
          answer: 2,
          explanation: '첫째항 $$a_1 = 3$$, 공비 $$r$$에 대하여 $$a_2 = 3r$$, $$a_3 = 3r^2$$ 입니다.\n$$a_2 a_3 = 9r^3 = 81 \\implies r^3 = 9$$\n따라서 $$\\frac{a_6}{a_3} = r^3 = 9$$ 입니다.'
        }
      },
      {
        id: 4,
        source: '2026년 9월 고2 학평 4번',
        points: 3,
        question: '$$0 < \\theta < \\frac{\\pi}{2}$$인 $$\\theta$$에 대하여 $$\\sin\\theta = \\frac{\\sqrt{5}}{3}$$일 때, $$\\cos(\\pi + \\theta)$$의 값은?',
        options: [
          '-\\frac{2}{3}',
          '-\\frac{1}{3}',
          '0',
          '\\frac{1}{3}',
          '\\frac{2}{3}'
        ],
        answer: 0, // 1번
        explanation: '삼각함수 관계식 $$\\sin^2\\theta + \\cos^2\\theta = 1$$에서:\n$$\\cos^2\\theta = 1 - \\left(\\frac{\\sqrt{5}}{3}\\right)^2 = 1 - \\frac{5}{9} = \\frac{4}{9}$$\n$$0 < \\theta < \\frac{\\pi}{2}$$이므로 $$\\cos\\theta = \\frac{2}{3}$$ 입니다.\n각 변환 공식에 의해 $$\\cos(\\pi + \\theta) = -\\cos\\theta = -\\frac{2}{3}$$ 입니다.',
        variation: {
          id: 204,
          source: '4번 쌍둥이 변형 문제',
          points: 3,
          question: '$$0 < \\theta < \\frac{\\pi}{2}$$인 $$\\theta$$에 대하여 $$\\cos\\theta = \\frac{3}{5}$$일 때, $$\\sin(\\pi + \\theta)$$의 값은?',
          options: [
            '-\\frac{4}{5}',
            '-\\frac{3}{5}',
            '0',
            '\\frac{3}{5}',
            '\\frac{4}{5}'
          ],
          answer: 0,
          explanation: '$$\\sin^2\\theta = 1 - \\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25} \\implies \\sin\\theta = \\frac{4}{5}$$\n각 변환 공식에 의해 $$\\sin(\\pi + \\theta) = -\\sin\\theta = -\\frac{4}{5}$$ 입니다.'
        }
      },
      {
        id: 5,
        source: '2026년 9월 고2 학평 6번',
        points: 3,
        question: '부등식 $$8^x < 1024 \\times 2^x$$을 만족시키는 모든 자연수 $$x$$의 값의 합은?',
        options: [
          '7',
          '8',
          '9',
          '10',
          '11'
        ],
        answer: 3, // 4번
        explanation: '밑을 2로 통일하여 정리합니다.\n$$8^x = (2^3)^x = 2^{3x}$$, $$1024 = 2^{10}$$\n$$2^{3x} < 2^{10} \\times 2^x = 2^{x + 10}$$\n밑 $$2 > 1$$이므로 지수 부등식으로 변환하면:\n$$3x < x + 10 \\implies 2x < 10 \\implies x < 5$$\n이를 만족하는 자연수 $$x$$는 $$1, 2, 3, 4$$입니다.\n모든 자연수의 합은 $$1 + 2 + 3 + 4 = 10$$ 입니다.',
        variation: {
          id: 205,
          source: '6번 쌍둥이 변형 문제',
          points: 3,
          question: '부등식 $$9^x < 243 \\times 3^x$$을 만족시키는 모든 자연수 $$x$$의 값의 합은?',
          options: [
            '6',
            '8',
            '10',
            '12',
            '15'
          ],
          answer: 2,
          explanation: '밑을 3으로 통일합니다:\n$$3^{2x} < 3^5 \\times 3^x = 3^{x + 5}$$\n$$2x < x + 5 \\implies x < 5$$\n자연수 $$x = 1, 2, 3, 4$$이므로 합은 $$1 + 2 + 3 + 4 = 10$$ 입니다.'
        }
      }
    ]
  },

  'grade-3': {
    gradeTitle: '고등학교 3학년',
    examTitle: '2026학년도 대학수학능력시험 9월 모의평가 기출 퀴즈',
    description: '수능 실전 평가원 공통과목(수학I·II) 및 핵심 빈출 문항 테스트입니다.',
    questions: [
      {
        id: 1,
        source: '2026학년도 수능 9월 모평 1번',
        points: 2,
        question: '$$5^{\\sqrt{2}+1} \\times \\left(\\frac{1}{5}\\right)^{\\sqrt{2}}$$의 값은?',
        options: [
          '\\frac{1}{25}',
          '\\frac{1}{5}',
          '1',
          '5',
          '25'
        ],
        answer: 3, // 4번
        explanation: '$$\\left(\\frac{1}{5}\\right)^{\\sqrt{2}} = 5^{-\\sqrt{2}}$$ 입니다.\n지수법칙에 의해 곱셈은 지수의 덧셈이 되므로:\n$$5^{\\sqrt{2}+1} \\times 5^{-\\sqrt{2}} = 5^{(\\sqrt{2}+1) + (-\\sqrt{2})} = 5^1 = 5$$ 입니다.',
        variation: {
          id: 301,
          source: '1번 쌍둥이 변형 문제',
          points: 2,
          question: '$$3^{\\sqrt{3}+1} \\times \\left(\\frac{1}{3}\\right)^{\\sqrt{3}}$$의 값은?',
          options: [
            '\\frac{1}{9}',
            '\\frac{1}{3}',
            '1',
            '3',
            '9'
          ],
          answer: 3,
          explanation: '$$3^{\\sqrt{3}+1} \\times 3^{-\\sqrt{3}} = 3^{(\\sqrt{3}+1) - \\sqrt{3}} = 3^1 = 3$$ 입니다.'
        }
      },
      {
        id: 2,
        source: '2026학년도 수능 9월 모평 2번',
        points: 2,
        question: '함수 $$f(x) = x^2 - 4x + 2$$에 대하여 $$\\lim_{h \\to 0} \\frac{f(4+h) - f(4)}{h}$$의 값은?',
        options: [
          '1',
          '2',
          '3',
          '4',
          '5'
        ],
        answer: 3, // 4번
        explanation: '미분계수의 정의에 의해 $$\\lim_{h \\to 0} \\frac{f(4+h) - f(4)}{h} = f\'(4)$$ 입니다.\n$$f\'(x) = 2x - 4$$\n따라서 $$f\'(4) = 2(4) - 4 = 8 - 4 = 4$$ 입니다.',
        variation: {
          id: 302,
          source: '2번 쌍둥이 변형 문제',
          points: 2,
          question: '함수 $$f(x) = 2x^2 - 3x + 5$$에 대하여 $$\\lim_{h \\to 0} \\frac{f(3+h) - f(3)}{h}$$의 값은?',
          options: [
            '5',
            '7',
            '9',
            '11',
            '13'
          ],
          answer: 2,
          explanation: '미분계수의 정의식은 $$f\'(3)$$을 의미합니다.\n$$f\'(x) = 4x - 3$$\n따라서 $$f\'(3) = 4(3) - 3 = 12 - 3 = 9$$ 입니다.'
        }
      },
      {
        id: 3,
        source: '2026학년도 수능 9월 모평 3번',
        points: 3,
        question: '수열 $${a_n}$$에 대하여 $$\\sum_{k=1}^6 (2a_k - 1) = 30$$일 때, $$\\sum_{k=1}^6 a_k$$의 값은?',
        options: [
          '2',
          '6',
          '10',
          '14',
          '18'
        ],
        answer: 4, // 5번
        explanation: '$$\\sum$$의 선형적 성질을 적용합니다:\n$$\\sum_{k=1}^6 (2a_k - 1) = 2\\sum_{k=1}^6 a_k - \\sum_{k=1}^6 1 = 2\\sum_{k=1}^6 a_k - 6 = 30$$\n$$2\\sum_{k=1}^6 a_k = 36$$\n따라서 $$\\sum_{k=1}^6 a_k = 18$$ 입니다.',
        variation: {
          id: 303,
          source: '3번 쌍둥이 변형 문제',
          points: 3,
          question: '수열 $${a_n}$$에 대하여 $$\\sum_{k=1}^5 (3a_k - 2) = 35$$일 때, $$\\sum_{k=1}^5 a_k$$의 값은?',
          options: [
            '9',
            '12',
            '15',
            '18',
            '21'
          ],
          answer: 2,
          explanation: '$$\\sum_{k=1}^5 (3a_k - 2) = 3\\sum_{k=1}^5 a_k - 5(2) = 3\\sum_{k=1}^5 a_k - 10 = 35$$\n$$3\\sum_{k=1}^5 a_k = 45 \\implies \\sum_{k=1}^5 a_k = 15$$ 입니다.'
        }
      },
      {
        id: 4,
        source: '2026학년도 수능 9월 모평 5번',
        points: 3,
        question: '함수 $$f(x) = (x^2 + 2)(x^2 + x - 3)$$에 대하여 $$f\'(1)$$의 값은?',
        options: [
          '6',
          '7',
          '8',
          '9',
          '10'
        ],
        answer: 1, // 2번
        explanation: '곱의 미분법 $$(uv)\' = u\'v + uv\'$$을 적용합니다.\n$$f\'(x) = (2x)(x^2 + x - 3) + (x^2 + 2)(2x + 1)$$\n$$x = 1$$을 대입하면:\n$$f\'(1) = 2(1)(1^2 + 1 - 3) + (1^2 + 2)(2(1) + 1)$$\n$$= 2(-1) + 3(3) = -2 + 9 = 7$$ 입니다.',
        variation: {
          id: 304,
          source: '5번 쌍둥이 변형 문제',
          points: 3,
          question: '함수 $$f(x) = (x^2 + 1)(2x^2 - 3x + 4)$$에 대하여 $$f\'(1)$$의 값은?',
          options: [
            '6',
            '8',
            '10',
            '12',
            '14'
          ],
          answer: 1,
          explanation: '곱의 미분법:\n$$f\'(x) = (2x)(2x^2 - 3x + 4) + (x^2 + 1)(4x - 3)$$\n$$f\'(1) = 2(1)(2 - 3 + 4) + (1+1)(4 - 3) = 2(3) + 2(1) = 6 + 2 = 8$$ 입니다.'
        }
      },
      {
        id: 5,
        source: '2026학년도 수능 9월 모평 7번',
        points: 3,
        question: '곡선 $$y = x^3 - 5x^2 + 6x$$ 위의 점 $$(3, 0)$$에서의 접선이 점 $$(5, a)$$를 지날 때, $$a$$의 값은?',
        options: [
          '6',
          '7',
          '8',
          '9',
          '10'
        ],
        answer: 0, // 1번
        explanation: '1) 접선의 기울기 구하기:\n$$y\' = 3x^2 - 10x + 6$$\n$$x = 3$$에서의 미분계수는 $$m = 3(3^2) - 10(3) + 6 = 27 - 30 + 6 = 3$$\n\n2) 접선의 방정식:\n$$y - 0 = 3(x - 3) \\implies y = 3x - 9$$\n\n3) 점 $$(5, a)$$ 대입:\n$$a = 3(5) - 9 = 15 - 9 = 6$$ 입니다.',
        variation: {
          id: 305,
          source: '7번 쌍둥이 변형 문제',
          points: 3,
          question: '곡선 $$y = x^3 - 3x^2 + 2x$$ 위의 점 $$(2, 0)$$에서의 접선이 점 $$(4, a)$$를 지날 때, $$a$$의 값은?',
          options: [
            '2',
            '4',
            '6',
            '8',
            '10'
          ],
          answer: 1,
          explanation: '$$y\' = 3x^2 - 6x + 2$$\n$$x = 2$$에서의 기울기: $$m = 3(4) - 6(2) + 2 = 2$$\n접선의 방정식: $$y - 0 = 2(x - 2) \\implies y = 2x - 4$$\n점 $$(4, a)$$를 대입하면: $$a = 2(4) - 4 = 8 - 4 = 4$$ 입니다.'
        }
      }
    ]
  }
};

window.QUIZ_DATA = QUIZ_DATA;
