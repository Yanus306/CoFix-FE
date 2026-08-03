export const fetchReviewNoteList = async () => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("token") || "YOUR_SECRET_TOKEN"; // 실제 토큰 관리 방식에 맞게 조정

    const response = await fetch(`${API_BASE_URL}/vulnerability`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("리뷰노트 목록 조회 실패:", error);
    return { success: false, error };
  }
};