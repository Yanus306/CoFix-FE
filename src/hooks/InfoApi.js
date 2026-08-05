import { useState } from 'react';
import { authFetch } from "../api/client";

export const useInfoApi = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authFetch('/auth/info', {
        method: 'GET',
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
      if (err.message === 'Unauthorized') {
        return { success: false, message: '세션이 만료되었습니다.' };
      }

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