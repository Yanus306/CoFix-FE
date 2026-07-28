import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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
      setError('인증 토큰이 없습니다.');
      setIsLoading(false);
      return { success: false, message: '인증 토큰이 없습니다.' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));
      const isSuccess = response.ok;

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