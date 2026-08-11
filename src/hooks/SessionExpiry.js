// hooks/SessionExpiry.js
import { useEffect, useRef } from "react";
import { authFetch } from "../api/client"; // 실제 경로에 맞게 수정

const CHECK_INTERVAL = 90 * 1000; // 1분 30초

export function useSessionCheck() {
  const lastCheckedAt = useRef(0);
  const isChecking = useRef(false);

  const checkSession = () => {
    const now = Date.now();

    if (isChecking.current) return;
    if (now - lastCheckedAt.current < CHECK_INTERVAL) return;

    lastCheckedAt.current = now;
    isChecking.current = true;

    authFetch("/auth/info")
      .catch(() => {
        // 401이면 authFetch 내부에서 이미 로그아웃 처리(alert + 리다이렉트)됨
      })
      .finally(() => {
        isChecking.current = false;
      });
  };

  useEffect(() => {
    checkSession(); // 페이지 진입/새로고침 시 즉시 1회 체크 (추가된 부분)

    document.addEventListener("click", checkSession);

    return () => {
      document.removeEventListener("click", checkSession);
    };
  }, []);
}