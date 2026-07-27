import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { mockReviewList } from "../../mocks/reviewdetaildata";
import { mockCodeList } from "../../mocks/codeareadata";

// ```javascript 등 마크다운 백틱 문법을 제거해 주는 유틸 함수
const cleanCodeString = (rawCode) => {
  if (!rawCode) return "";
  return rawCode.replace(/```[a-zA-Z]*\n?/g, "").replace(/```$/g, "").trim();
};

export default function ReviewDetail({ review }) {
  const [isEditing, setIsEditing] = useState(false);
  const [guideText, setGuideText] = useState("");

  const matchedReviewMock = mockReviewList.find((item) => item.id === review?.id);
  const matchedCodeMock = mockCodeList.find((item) => item.id === review?.id);

  const rawCodeContent = review?.codeMarkdown || matchedCodeMock?.codeMarkdown || "";
  const codeContent = cleanCodeString(rawCodeContent);

  const initialGuide = review?.guide || review?.guideMarkdown || matchedReviewMock?.guideMarkdown || matchedReviewMock?.guide || "";

  useEffect(() => {
    if (review) {
      setGuideText(initialGuide);
      setIsEditing(false);
    }
  }, [review, initialGuide]);

  if (!review) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray200 text-[1.6vh]">
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
    <div className="w-full h-full flex flex-col text-white animate-fade-in overflow-hidden">
      {/* 1. 상단 헤더 영역 */}
      <div className="flex flex-col border-b border-white-5 px-[2.5vw] shrink-0">
        <div className="text-[2.6vh] tracking-tight leading-snug mb-[0.8vh]">
          {review.content}
        </div>

        <div className="flex items-center gap-[1vw] text-gray400 text-[1.55vh] mb-[1.5vh]">
          <div>프로젝트: 2026_알고리즘_과제</div>
          <div className="text-[1.4vh]">|</div>
          <div>
            <span className="mr-[0.3vw]">발생일:</span>
            {review.date}
          </div>
        </div>
      </div>

      {/* 2. 문제 코드 영역 */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="bg-gray800-50 px-[2.5vw] py-[0.8vh] shrink-0">
          <div className="text-gray400 text-[1.55vh]">문제코드</div>
        </div>
        
        <div className="flex-1 min-h-0 bg-gray900 border border-purple500-20 p-[1vw] text-[1.4vh] overflow-y-auto leading-relaxed custom-code-highlight">
          {codeContent ? (
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: 0,
                background: "transparent",
                fontSize: "1.4vh",
                lineHeight: "1.6",
              }}
            >
              {codeContent}
            </SyntaxHighlighter>
          ) : (
            <span className="text-gray400">(등록된 코드가 없습니다.)</span>
          )}
        </div>
      </div>

      {/* 3. 개념 요약 및 가이드 영역 */}
      <div className="flex flex-col flex-1 min-h-0 px-[2.5vw] pt-[1.5vh] pb-[2vh]">
        <div className="flex justify-between items-center mb-[1vh] shrink-0">
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
                className="px-[0.9vw] py-[0.5vh] rounded-xl bg-purple500-10 text-purple400 text-[1.4vh] border border-purple500-20 hover:bg-purple500-20 transition-all cursor-pointer outline-none focus:outline-none"
              >
                편집
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelClick}
                  className="px-[0.9vw] py-[0.5vh] rounded-xl bg-red500-10 text-red400 text-[1.4vh] border border-red500-20 hover:bg-red500-20 transition-all cursor-pointer outline-none focus:outline-none"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveClick}
                  className="px-[0.9vw] py-[0.5vh] rounded-xl bg-purple500-10 text-purple400 text-[1.4vh] border border-purple500-20 hover:bg-purple500-20 transition-all cursor-pointer outline-none focus:outline-none"
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
            className="w-full flex-1 border border-white-5 focus:border-white-5 rounded-2xl px-[1.5vw] py-[1.2vh] text-gray200 text-[1.65vh] resize-none leading-relaxed bg-transparent outline-none focus:outline-none focus:ring-0"
          />
        ) : (
          <div className="w-full flex-1 border border-white-5 rounded-2xl px-[1.5vw] py-[1.2vh] text-gray400 text-[1.65vh] overflow-y-auto leading-relaxed">
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