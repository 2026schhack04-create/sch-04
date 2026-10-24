/**
 * ==============================================================================
 * [설정 파일] API 키 및 외부 서비스 연동 설정
 * ==============================================================================
 * "아이피 키는 내가 추가할거야"라고 말씀해주신 부분입니다.
 * 추후 발급받으신 Google Client ID나 AI/수학 서비스 API 키를 아래에 넣어주시면 됩니다.
 * (웹 화면 우측 상단의 ⚙️ 설정 아이콘을 통해서도 브라우저에서 직접 등록하실 수 있습니다.)
 */

const CONFIG = {
  // 구글 로그인 OAuth 2.0 Client ID (예: '123456789-abcdef.apps.googleusercontent.com')
  GOOGLE_CLIENT_ID: "",

  // 향후 사용할 AI / 백엔드 / 외부 수학 API 키 (예: Gemini API Key, OpenAI, Wolfram 등)
  MATH_API_KEY: "",

  // 사용할 Gemini 모델 (비워두면 gemini-3.8-flash → gemini-3.5-flash 순서로 자동 시도)
  GEMINI_MODEL: "",

  // 앱 환경 설정
  APP_NAME: "MathLab - 고교 수학 완성",
  VERSION: "1.0.0",

  // 구글 로그인 실제 API 연동 여부 (Client ID가 없으면 개발/테스트용 모의 로그인으로 동작)
  USE_MOCK_LOGIN_IF_NO_KEY: true
};

// 브라우저 전역 객체에 노출
window.APP_CONFIG = CONFIG;
