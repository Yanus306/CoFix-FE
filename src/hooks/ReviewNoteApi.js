export const fetchReviewNoteList = async () => {
  try {
    const response = await fetch("https://cofix.jongyeol.kr/vulnerability", {
      headers: {
        Authorization: "Bearer YOUR_SECRET_TOKEN",
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