import { useState, useEffect, useRef } from "react";

export function useDashboardWebSocket(token) {
  const [dashboardData, setDashboardData] = useState({
    filePath: undefined,
    lastCodingTime: undefined,
    dashboardVulnerabilities: undefined,
    lastTypingWpm: undefined,
    lastCodeSession: undefined,
  });
  const ws = useRef(null);

  useEffect(() => {
    if (!token) return; // 토큰이 없으면 연결하지 않음

    // 서버 웹소켓 URL
    const WS_URL = "wss://cofix.jongyeol.kr/ws/dashboard/live";
    ws.current = new WebSocket(WS_URL);

    // 연결 성공 시
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: 0, parameter: token }));
    };

    // 메시지 수신 시 데이터 업데이트
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setDashboardData((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error("웹소켓 데이터 파싱 에러:", error);
      }
    };

    // 1분마다 하트비트 전송
    const heartbeat = setInterval(() => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 1 }));
      }
    }, 60000);

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearInterval(heartbeat);
      if (ws.current) {
        if (ws.current.readyState === WebSocket.CONNECTING) {
          // 아직 연결 중이라면, 연결이 완료된 직후에 닫히도록 onopen을 덮어씌움
          ws.current.onopen = () => {
            ws.current.close();
          };
        } else if (ws.current.readyState === WebSocket.OPEN) {
          // 이미 연결된 상태라면 즉시 닫음
          ws.current.close();
        }
      }
    };
  }, [token]);

  return dashboardData;
}
