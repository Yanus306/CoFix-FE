import { useState, useEffect } from "react";

export default function ReviewDetail({ review }) {
  // 💡 편집 상태 및 가이드 텍스트 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [guideText, setGuideText] = useState("");

  // 💡 선택된 리뷰가 변경되거나 review 데이터가 들어올 때 초기화
  useEffect(() => {
    if (review) {
      setGuideText(review.guide || ""); // review 객체에 guide 필드가 있다고 가정
      setIsEditing(false); // 리뷰가 바뀌면 편집 모드 해제
    }
  }, [review]);

  if (!review) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    // 💡 취소 시 기존 review 텍스트로 원복 후 편집 모드 종료
    setGuideText(review.guide || "");
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // 💡 경고창(alert) 없이 바로 저장 처리 및 편집 모드 종료
    console.log("저장할 가이드 내용:", guideText);
    review.guide = guideText; 

    setIsEditing(false);
  };

  return (
    <div
      key={review.id}
      className="w-[183%] h-[79vh] rounded-3xl p-[2.5vw] flex flex-col gap-[1.5vh] text-white animate-fade-in duration-300 mt-[-3vh]"
    >
      {/* 상단 헤더 영역 */}
      <div className="flex flex-col gap-[1vh] border-b border-purple500/10 pb-[1.5vh]">
        <div className="font-bold text-[2.6vh] text-white tracking-tight leading-snug">
          {review.content}
        </div>

        <div className="flex justify-start items-center gap-[1vw] text-gray400 text-[1.55vh] w-full">
          <div className="py-[0.3vh] text-gray400">
            프로젝트: 2026_알고리즘_과제
          </div>
          <div className="text-gray600 text-[1.4vh]">|</div>
          <div>
            <span className="text-gray400 mr-[0.3vw]">발생일:</span>
            {review.date}
          </div>
        </div>
      </div>

      {/* 문제 코드 영역 */}
      <div className="flex flex-col gap-[0.6vh]">
        <div className="text-gray400 text-[1.55vh]">문제코드</div>
        <div className="w-full h-[26vh] border border-dashed border-gray700 rounded-2xl flex items-center justify-center text-gray600 text-[1.5vh]">
          (코드 영역 스킵)
        </div>
      </div>

      {/* 개념 요약 및 가이드 영역 */}
      <div className="flex flex-col gap-[1.2vh] mt-[0.2vh]">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-[0.4vh]">
            <div className="text-gray200 text-[2.35vh] font-semibold">
              개념 요약 및 가이드
            </div>
            <div className="text-gray500 text-[1.3vh]">
              AI가 분석한 실수의 개념 요약입니다. 내용을 확인하고 수정하며, 나만의 정리본을 만들어 보세요.
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-center gap-[0.6vw]">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="px-[0.9vw] py-[0.5vh] rounded-xl bg-purple500/10 text-purple400 text-[1.4vh] transition-all border border-solid border-purple500/20 cursor-pointer hover:bg-purple500/20"
              >
                편집
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelClick}
                  className="px-[0.9vw] py-[0.5vh] rounded-xl bg-red500-10 text-red400 text-[1.4vh] transition-all border border-solid border-red-500/20 cursor-pointer hover:bg-red500-20"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveClick}
                  className="px-[0.9vw] py-[0.5vh] rounded-xl bg-purple500-10 text-purple400 text-[1.4vh] transition-all border border-solid border-purple500/20 cursor-pointer hover:bg-purple500/20"
                >
                  저장
                </button>
              </>
            )}
          </div>
        </div>

        {/* 가이드 영역 */}
        {isEditing ? (
          <textarea
            value={guideText}
            onChange={(e) => setGuideText(e.target.value)}
            placeholder="개념 요약 및 가이드를 작성해 보세요."
            className="w-full h-[21vh] border border-solid border-white/10 bg-black/30 rounded-2xl p-[1.2vw] text-gray200 text-[1.5vh] resize-none leading-relaxed outline-none focus:outline-none focus:ring-0 focus:border-white/10"
          />
        ) : (
          <div className="w-full h-[21vh] border border-dashed border-gray700 rounded-2xl p-[1.2vw] text-gray300 text-[1.5vh] overflow-y-auto leading-relaxed whitespace-pre-wrap">
            {guideText || "(등록된 가이드 내용이 없습니다.)"}
          </div>
        )}
      </div>
    </div>
  );
}