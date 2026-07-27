import { useState } from 'react';

const BASE_URL = ''; // Vite dev 서버 프록시 타도록 설정

export const useRegisterApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 명세서 기준 회원가입 요청 함수
   * @param {Object} params
   * @param {string} params.username
   * @param {string} params.password
   * @param {string} params.nickname
   * @param {string} params.email - 전송할 완성된 이메일 주소
   */
  const registerUser = async ({ username, password, nickname, email }) => {
    setIsLoading(true);
    setError(null);

    // 💡 F12 콘솔창에서 확인할 데이터 (이메일 추가)
    console.log(' 보내는 회원가입 데이터:', {
      username: username.trim(),
      password: password,
      nickname: nickname.trim(),
      email: email ? email.trim() : '',
    });

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
          nickname: nickname.trim(),
          email: email ? email.trim() : '', // 👈 백엔드로 이메일 함께 전송
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
      console.error('🚨 Register API Network Error:', err);
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