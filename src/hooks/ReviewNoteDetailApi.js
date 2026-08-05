import { authFetch } from "../api/client";

export async function fetchVulnerabilityDetail(id) {
  try {
    const response = await authFetch(`/vulnerability/detail/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("상세 정보를 불러오는데 실패했습니다.");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: error.message };
  }
}