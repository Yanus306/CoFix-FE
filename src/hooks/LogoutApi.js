import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function useLogoutApi() {
  const [isLoading, setIsLoading] = useState(false);

  const logoutUser = async () => {
    if (isLoading) return { success: false, message: '이미 요청 중입니다.' };

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');

        return { success: true, status: response.status };
      } else {
        return { success: false, status: response.status, message: '로그아웃에 실패했습니다.' };
      }
    } catch (error) {
      return { success: false, message: error.message || '네트워크 오류가 발생했습니다.' };
    } finally {
      setIsLoading(false);
    }
  };

  return { logoutUser, isLoading };
}