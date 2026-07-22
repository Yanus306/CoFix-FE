import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { mockReviewList } from "../../mocks/reviewdetaildata";
import { mockCodeList } from "../../mocks/codeareadata";

export default function ReviewDetail({ review }) {
  const [isEditing, setIsEditing] = useState(false);
  const [guideText, setGuideText] = useState("");

  const matchedReviewMock = mockReviewList.find((item) => item.id === review?.id);
  const matchedCodeMock = mockCodeList.find((item) => item.id === review?.id);

  const codeContent = review?.codeMarkdown || matchedCodeMock?.codeMarkdown || "";
  const initialGuide = review?.guide || review?.guideMarkdown || matchedReviewMock?.guideMarkdown || matchedReviewMock?.guide || "";

  useEffect(() => {
    if (review) {
      setGuideText(initialGuide);
      setIsEditing(false);
    }
  }, [review, initialGuide]);

  if (!review) {
    return (
      <div className="w-full h-full rounded-3xl flex items-center justify-center text-gray500 text-[1.6vh]">
        목록에서 실수를 선택하면 상세 내용이 나타납니다.
      </div>
    );
  }

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setGuideText(initialGuide);
    setIsEditing(false);
  };
  const handleSaveClick = () => {
    console.log("저장할 가이드 내용:", guideText);
    review.guide = guideText;
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full rounded-3xl px-[2.5vw] flex flex-col text-white justify-between animate-fade-in duration-300">
      {/* 상단 헤더 영역 */}
      <div className="flex flex-col gap-[1vh] border-purple500-10 pb-[1.5vh]">
        <div className="font-bold text-[2.6vh] text-white tracking-tight leading-snug">
          {review.content}
        </div>

        <div className="flex justify-start items-center gap-[1vw] text-gray400 text-[1.55vh] w-full">
          <div className="py-[0.3vh] text-gray400">
            프로젝트: 2026_알고리즘_과제
          </div>
          <div className="text-gray700 text-[1.4vh]">|</div>
          <div>
            <span className="text-gray400 mr-[0.3vw]">발생일:</span>
            {review.date}
          </div>
        </div>
      </div>

      {/* 문제 코드 영역 */}
      <div className="flex flex-col gap-[0.6vh]">
        <div className="text-gray400 text-[1.55vh]">문제코드</div>
        <div className="w-full h-[30vh]  rounded-2xl p-[1.2vw] text-gray300 text-[1.4vh] overflow-y-auto leading-relaxed">
          {codeContent ? (
            <ReactMarkdown>{codeContent}</ReactMarkdown>
          ) : (
            <span className="text-gray400">(등록된 코드가 없습니다.)</span>
          )}
        </div>
      </div>

      {/* 개념 요약 및 가이드 영역 */}
      <div className="flex flex-col gap-[1.2vh] flex-1 max-h-[32vh]">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-[0.4vh]">
            <div className="text-gray200 text-[2.2vh] font-semibold">
              개념 요약 및 가이드
            </div>
            <div className="text-gray400 text-[1.3vh]">
              AI가 분석한 실수의 개념 요약입니다. 내용을 확인하고 수정하며 나만의 정리본을 만들어 보세요.
            </div>
          </div>

          <div className="flex items-center gap-[0.6vw]">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="px-[0.9vw] py-[0.5vh] rounded-xl bg-purple500-10 text-purple400 text-[1.4vh] border border-purple500-20 hover:bg-purple500-20 transition-all cursor-pointer"
              >
                편집
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelClick}
                  className="px-[0.9vw] py-[0.5vh] rounded-xl bg-red500-10 text-red400 text-[1.4vh] border border-red500-20 hover:bg-red500-20 transition-all cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveClick}
                  className="px-[0.9vw] py-[0.5vh] rounded-xl bg-purple500-10 text-purple400 text-[1.4vh] border border-purple500-20 hover:bg-purple500-20 transition-all cursor-pointer"
                >
                  저장
                </button>
              </>
            )}
          </div>
        </div>

        {/* 가이드 본문/편집 입력 */}
        {isEditing ? (
          <textarea
            value={guideText}
            onChange={(e) => setGuideText(e.target.value)}
            placeholder="개념 요약 및 가이드를 작성해 보세요."
            className="w-full flex-1 h-[18vh] border-white-5 rounded-2xl p-[1.2vw] text-gray200 text-[1.5vh] resize-none leading-relaxed outline-none"
          />
        ) : (
          <div className="w-full flex-1 h-[18vh] border-gray700 rounded-2xl p-[1.2vw] text-gray300 text-[1.5vh] overflow-y-auto leading-relaxed">
            {guideText ? (
              <ReactMarkdown>{guideText}</ReactMarkdown>
            ) : (
              <span className="text-gray400">(등록된 가이드 내용이 없습니다.)</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}