export const updateGuide = async (id, guide) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("token") || "YOUR_SECRET_TOKEN"; // 실제 토큰 관리 방식에 맞게 조정

    const response = await fetch(`${API_BASE_URL}/vulnerability/guide/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ guide }),
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    return { success: true, data };
  } catch (error) {
    console.error("가이드 저장 실패:", error);
    return { success: false, error };
  }
};