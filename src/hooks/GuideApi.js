import { authFetch } from "../api/client";

export const updateGuide = async (id, guide) => {
  try {
    const response = await authFetch(`/vulnerability/guide/${id}`, {
      method: "PUT",
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