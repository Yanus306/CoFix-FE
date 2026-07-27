import { useState } from 'react';

const BASE_URL = ''; // Vite dev 서버 프록시 사용

export const useLoginApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 로그인 요청 함수
   * @param {Object} params
   * @param {string} params.username
   * @param {string} params.password
   */
  const loginUser = async ({ username, password }) => {
    setIsLoading(true);
    setError(null);

    // 💡 F12 콘솔창에서 확인할 보내는 데이터
    console.log('🔑 보내는 로그인 데이터:', {
      username: username.trim(),
      password: password,
    });

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        return {
          success: true,
          data,
        };
      }

      return {
        success: false,
        status: response.status,
        message: data.message || '아이디 또는 비밀번호가 올바르지 않습니다.',
      };
    } catch (err) {
      console.error('🚨 Login API Network Error:', err);
      return {
        success: false,
        message: '서버와 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
};