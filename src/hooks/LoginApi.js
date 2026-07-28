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

    // 로그인 시도 시간 생성 (예: 2026-06-07 14:30:25)
    const now = new Date();
    const attemptTime = now.toISOString().replace('T', ' ').substring(0, 19);
    const trimmedUsername = username.trim();

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      const isSuccess = response.ok;

      // 💡 로그인 시도 시에는 입력한 아이디(username)를 출력하도록 수정
      console.log(`시도 시간: ${attemptTime}`);
      console.log(`아이디: ${trimmedUsername}`);
      console.log(`로그인 여부: ${isSuccess ? '성공' : '실패'}`);

      if (isSuccess) {
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
      console.log(`시도 시간: ${attemptTime}`);
      console.log(`아이디: ${trimmedUsername}`);
      console.log(`로그인 여부: 실패 (네트워크 에러)`);
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