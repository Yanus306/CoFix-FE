import { useState, useEffect, useRef } from "react";

export function useDashboardWebSocket() {
  const [dashboardData, setDashboardData] = useState({
    filePath: undefined,
    lastCodingTime: undefined,
    dashboardVulnerabilities: undefined,
    lastTypingWpm: undefined,
    lastCodeSession: undefined,
  });
  const ws = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const token = localStorage.getItem("token"); 
    if (!token) return;

    const WS_URL = "wss://cofix.jongyeol.kr/ws/dashboard/live";
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      if (isMounted) {
        // 연결 성공 시 토큰 전송
        ws.current.send(JSON.stringify({ type: 0, parameter: token }));
        console.log("🟢 웹소켓 연결 성공 및 토큰 전송 완료!");
      }
    };

    ws.current.onmessage = (event) => {
      if (!isMounted) return;
      try {
        const data = JSON.parse(event.data);
        setDashboardData((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error("웹소켓 데이터 파싱 에러:", error);
      }
    };

    const heartbeat = setInterval(() => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 1 }));
      }
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(heartbeat);
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  return dashboardData;
}