const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// 여러 요청이 동시에 401을 받아도 로그아웃 처리는 한 번만 실행되도록 막는 플래그
let isLoggingOut = false;

/**
 * 인증 토큰을 포함하여 API를 요청하고, 
 * 401 Unauthorized 발생 시 자동으로 로그아웃 처리하는 공통 래퍼 함수
 *
 * @param {string} url - 요청 경로
 * @param {object} options - fetch 옵션
 * @param {boolean} [options.skipAuthHandling] - true면 401이 와도 자동 로그아웃 처리를 하지 않음
 *   (로그인/회원가입 등 인증이 필요 없는 엔드포인트에서 사용)
 */
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const { skipAuthHandling, ...restOptions } = options;

  // FormData인 경우 Content-Type을 강제로 지정하면 boundary가 깨지므로 제외
  const isFormData = restOptions.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...restOptions.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...restOptions,
      headers,
    });

    if (response.status === 401 && !skipAuthHandling) {
      if (!isLoggingOut) {
        isLoggingOut = true;

        console.warn('⚠️ [Auth] 세션이 만료되었습니다. 자동 로그아웃을 진행합니다.');

        localStorage.removeItem('token');
        localStorage.removeItem('userInfo'); // 필요에 따라 추가
        localStorage.removeItem('nickname');
        
        alert('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/';
      }

      throw new Error('Unauthorized');
    }

    return response;
  } catch (error) {
    if (error.message === 'Unauthorized') throw error;
    console.error('API 요청 중 에러 발생:', error);
    throw error;
  }
};