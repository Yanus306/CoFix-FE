import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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

    const trimmedUsername = username.trim();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
      setError('서버와 연결할 수 없습니다.');
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