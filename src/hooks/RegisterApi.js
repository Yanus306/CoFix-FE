import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const useRegisterApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 회원가입 요청 함수
   * @param {Object} params
   * @param {string} params.username
   * @param {string} params.password
   * @param {string} params.nickname
   */
  const registerUser = async ({ username, password, nickname }) => {
    setIsLoading(true);
    setError(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password;
    const trimmedNickname = nickname ? nickname.trim() : '';

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: trimmedPassword,
          nickname: trimmedNickname,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        return { 
          success: true, 
          data 
        };
      }

      return {
        success: false,
        status: response.status,
        message: data.message || '회원가입에 실패했습니다.',
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

  return { registerUser, isLoading, error };
};