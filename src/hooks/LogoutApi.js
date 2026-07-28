import { useState } from 'react';

export function useLogoutApi() {
  const [isLoading, setIsLoading] = useState(false);

  const logoutUser = async () => {
    if (isLoading) return { success: false, message: '이미 요청 중입니다.' };

    setIsLoading(true);
    const startTime = new Date();
    console.log(`[로그아웃 시도] 시간: ${startTime.toLocaleTimeString()}`);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://cofix.jongyeol.kr/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const endTime = new Date();
      const duration = endTime - startTime;

      if (response.ok) {
        console.log(`[로그아웃 성공] 여부: 성공 (Status: ${response.status}) | 소요 시간: ${duration}ms | 완료 시간: ${endTime.toLocaleTimeString()}`);
        
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');

        return { success: true, status: response.status };
      } else {
        console.warn(`[로그아웃 실패] 여부: 실패 (Status: ${response.status}) | 소요 시간: ${duration}ms | 완료 시간: ${endTime.toLocaleTimeString()}`);
        return { success: false, status: response.status, message: '로그아웃에 실패했습니다.' };
      }
    } catch (error) {
      const endTime = new Date();
      console.error(`[로그아웃 에러] 여부: 에러 발생 | 완료 시간: ${endTime.toLocaleTimeString()}`, error);
      return { success: false, message: error.message || '네트워크 오류가 발생했습니다.' };
    } finally {
      setIsLoading(false);
    }
  };

  return { logoutUser, isLoading };
}