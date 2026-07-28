import { useState } from 'react';

const BASE_URL = ''; // Vite dev 서버 프록시 사용 (필요시 https://cofix.jongyeol.kr 입력)

export const useInfoApi = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 사용자 정보 조회 요청 함수 (필요할 때 수동으로 호출)
   */
  const fetchUserInfo = async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('token');

    if (!token) {
      setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
      setIsLoading(false);
      return { success: false, message: '인증 토큰이 없습니다.' };
    }

    console.log('--- 사용자 정보 조회 요청 ---');
    console.log(`시도 시간: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}`);
    console.log('-----------------------------');

    try {
      const response = await fetch(`${BASE_URL}/auth/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));
      const isSuccess = response.ok;

      console.log('--- 사용자 정보 조회 결과 ---');
      console.log(`조회 여부: ${isSuccess ? '성공' : '실패'}`);
      if (isSuccess) {
        console.log('유저 데이터:', data);
      } else {
        console.log(`오류 내용: ${data.message || '정보를 불러오지 못했습니다.'}`);
      }
      console.log('-----------------------------');

      if (isSuccess) {
        setUserInfo(data);
        return { success: true, data };
      }

      return {
        success: false,
        status: response.status,
        message: data.message || '사용자 정보를 불러오는데 실패했습니다.',
      };
    } catch (err) {
      console.log('--- 사용자 정보 조회 결과 ---');
      console.log('조회 여부: 실패 (네트워크 에러)');
      console.log('-----------------------------');
      console.error('🚨 Info API Network Error:', err);

      setError('서버와 연결할 수 없습니다.');
      return {
        success: false,
        message: '서버와 연결할 수 없습니다. 네트워크 상태를 확인해 주세요.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { userInfo, isLoading, error, fetchUserInfo };
};