import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SlideFadeIn from "../../shared/SlideFadeIn";
import { fetchVulnerabilityDetail } from "../../hooks/ReviewNoteDetailApi";
import { updateGuide } from "../../hooks/GuideApi";

// ```javascript 등 마크다운 백틱 문법을 제거해 주는 유틸 함수
const cleanCodeString = (rawCode) => {
  if (!rawCode) return "";
  return rawCode
    .replace(/```[a-zA-Z]*\n?/g, "")
    .replace(/```$/g, "")
    .trim();
};

export default function ReviewDetail({ sessionId, review }) {
  const [isEditing, setIsEditing] = useState(false);
  const [guideText, setGuideText] = useState("");
  const [detailData, setDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 리뷰 ID가 변경될 때마다 백엔드 API 호출
  useEffect(() => {
    if (!review?.id) return;

    const loadDetailData = async () => {
      setIsLoading(true);
      const result = await fetchVulnerabilityDetail(review.id);

      if (result.success) {
        setDetailData(result.data);
        const guide =
          result.data.guide || result.data.guideMarkdown || review?.guide || "";
        setGuideText(guide);
      } else {
        const fallbackGuide = review?.guide || review?.guideMarkdown || "";
        setGuideText(fallbackGuide);
      }
      setIsLoading(false);
      setIsEditing(false);
    };

    loadDetailData();
  }, [review?.id]);

  if (!review) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray200 text-[1.6vh]"></div>
    );
  }

  const rawCodeContent =
    detailData?.codeMarkdown || detailData?.code || review?.codeMarkdown || "";
  const codeContent = cleanCodeString(rawCodeContent);

  const initialGuide =
    detailData?.guide ||
    detailData?.guideMarkdown ||
    review?.guide ||
    review?.guideMarkdown ||
    "";

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setGuideText(initialGuide);
    setIsEditing(false);
  };
  const handleSaveClick = async () => {
    const id = review?.id;
    if (!id) return;

    setIsLoading(true);
    const result = await updateGuide(id, guideText);
    setIsLoading(false);

    if (result.success) {
      if (detailData) {
        setDetailData({ ...detailData, guide: guideText });
      } else {
        review.guide = guideText;
      }
      setIsEditing(false);
    } else {
      alert("가이드 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SlideFadeIn
      animationKey={sessionId}
      className={review ? "active-chat" : "new-chat"}
    >
      <div className="w-full h-full flex flex-col text-white animate-fade-in overflow-hidden">
        {/* 상단 헤더 영역 */}
        <div className="flex flex-col border-b border-white-5 px-[2.5vw] shrink-0">
          <div className="text-[2.6vh] tracking-tight leading-snug mb-[0.8vh]">
            {detailData?.title || review.title}
          </div>

          <div className="flex items-center gap-[1vw] text-gray400 text-[1.55vh] mb-[1.5vh]">
            <div>프로젝트: {detailData?.project || review.project}</div>
            <div className="text-[1.4vh]">|</div>
            <div>파일이름: {detailData?.fileName || review.fileName}</div>
            <div className="text-[1.4vh]">|</div>
            <div>
              <span className="mr-[0.3vw]">발생일:</span>
              {detailData?.createdAt
                ? new Date(detailData.createdAt).toLocaleDateString("ko-KR")
                : ""}
            </div>
          </div>
        </div>

        {/* 문제 코드 영역 */}
        <div className="flex flex-col flex-1 min-h-0 min-w-0 w-[56.2vw]">
          <div className="bg-gray800-50 px-[2.5vw] py-[0.8vh] shrink-0">
            <div className="text-gray400 text-[1.55vh]">문제코드</div>
          </div>

          <div className="flex-1 min-h-0 min-w-0 bg-gray900 border border-purple500-20 p-[1vw] text-[1.4vh] overflow-auto leading-relaxed custom-code-highlight">
            {isLoading ? (
              <span className="text-gray400">코드 불러오는 중...</span>
            ) : codeContent ? (
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  background: "transparent",
                  margin: 0,
                  padding: 0,
                  fontSize: "1.4vh",
                  lineHeight: "1.6",
                  overflow: "visible",
                }}
              >
                {codeContent}
              </SyntaxHighlighter>
            ) : (
              <span className="text-gray400">(등록된 코드가 없습니다.)</span>
            )}
          </div>
        </div>

        {/* 개념 요약 및 가이드 영역 */}
        <div className="flex flex-col flex-1 min-h-0 px-[2.5vw] pt-[1.5vh] pb-[2vh]">
          <div className="flex justify-between items-center mb-[1vh] shrink-0">
            <div className="flex flex-col gap-[0.4vh]">
              <div className="text-gray200 text-[2.2vh] font-semibold">
                개념 요약 및 가이드
              </div>
              <div className="text-gray400 text-[1.3vh]">
                AI가 분석한 실수의 개념 요약입니다. 내용을 확인하고 수정하며
                나만의 정리본을 만들어 보세요.
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
            <div className="w-full flex-1 flex border border-white-5 rounded-2xl px-[1.5vw] py-[1.2vh]">
              <textarea
                value={guideText}
                onChange={(e) => setGuideText(e.target.value)}
                placeholder="개념 요약 및 가이드를 작성해 보세요."
                className="w-full h-full bg-transparent text-gray200 text-[1.65vh] resize-none leading-relaxed border-none outline-none focus:outline-none focus:ring-0 p-0 m-0"
              />
            </div>
          ) : (
            <div className="w-full flex-1 border border-white-5 rounded-2xl px-[1.5vw] py-[1.2vh] text-gray400 text-[1.65vh] overflow-y-auto leading-relaxed">
              {isLoading ? (
                <span className="text-gray400">가이드 불러오는 중...</span>
              ) : guideText ? (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{guideText}</ReactMarkdown>
                </div>
              ) : (
                <span className="text-gray400">
                  (등록된 가이드 내용이 없습니다.)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </SlideFadeIn>
  );
}