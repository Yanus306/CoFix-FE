export const updateGuide = async (id, guide) => {
  try {
    const response = await fetch(`https://cofix.jongyeol.kr/vulnerability/guide/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_SECRET_TOKEN",
      },
      body: JSON.stringify({ guide }),
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("가이드 저장 실패:", error);
    return { success: false, error };
  }
};