export async function fetchVulnerabilityDetail(id) {
  try {
    const token = localStorage.getItem("accessToken") || "YOUR_SECRET_TOKEN"; // 실제 토큰 관리 방식에 맞게 조정
    const response = await fetch(`https://cofix.jongyeol.kr/vulnerability/detail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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