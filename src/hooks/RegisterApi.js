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

    // 회원가입 시도 시간 생성 (예: 2026-07-28 11:04:04)
    const now = new Date();
    const attemptTime = now.toISOString().replace('T', ' ').substring(0, 19);

    const trimmedUsername = username.trim();
    const trimmedNickname = nickname.trim();
    const trimmedEmail = email ? email.trim() : '';

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password: password,
          nickname: trimmedNickname,
          email: trimmedEmail,
        }),
      });

      const data = await response.json().catch(() => ({}));
      const isSuccess = response.ok;

      // 💡 콘솔에 회원가입 일시, 입력 정보, 성공/실패 여부 출력
      console.log(`--- 회원가입 시도 결과 ---`);
      console.log(`시도 시간: ${attemptTime}`);
      console.log(`회원가입 정보:`, {
        username: trimmedUsername,
        nickname: trimmedNickname,
        email: trimmedEmail,
        password: '********', // 보안상 비밀번호는 마스킹 처리하여 출력
      });
      console.log(`회원가입 여부: ${isSuccess ? '성공' : '실패'}`);
      if (!isSuccess) {
        console.log(`오류 내용: ${data.message || '중복된 아이디 또는 입력값 오류'}`);
      }
      console.log(`--------------------------`);

      if (isSuccess) {
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
      console.log(`--- 회원가입 시도 결과 ---`);
      console.log(`시도 시간: ${attemptTime}`);
      console.log(`회원가입 정보:`, {
        username: trimmedUsername,
        nickname: trimmedNickname,
        email: trimmedEmail,
        password: '********',
      });
      console.log(`회원가입 여부: 실패 (네트워크 에러)`);
      console.log(`--------------------------`);
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