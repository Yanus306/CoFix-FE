// 임시 세부내용 컴포넌트
export default function ReviewDetail({ review }) {
  // 선택된 리스트가 없을 때는 빈 투명 박스로 자리만 차지하게 만듦 (리스트 밀림 방지!)
  if (!review) {
    return (
      <div className="w-[30vw] h-[60vh]" />
    );
  }

  // 리스트를 클릭했을 때 그 고정된 자리 안에서 내용만 스르륵 나타남
  return (
    <div className="w-[30vw] h-[60vh] border border-purple500/20 rounded-3xl p-[2vw] flex flex-col gap-[2vh] text-white animate-fade-in duration-300">
      <div className="flex justify-between items-center border-b border-purple500/10 pb-[1.5vh]">
        <span className="font-bold text-[2.5vh] text-purple300">{review.badge}</span>
        <span className="text-gray500 text-[1.3vh]">{review.date}</span>
      </div>
      
      <div className="flex flex-col gap-[1vh]">
        <div className="text-gray400 text-[1.4vh] font-semibold">실수 요약</div>
        <div className="text-[1.85vh] py-[0.5vh] text-gray200">{review.content}</div>
      </div>

      {/* 피드백 영역 */}
      <div className="flex flex-col gap-[1vh] mt-auto">
        <div className="text-gray400 text-[1.4vh]">💡 피드백 노트</div>
        <p className="text-[1.48vh] text-gray500 leading-relaxed">
          이 실수가 왜 발생했는지, 어떻게 해결했는지 상세 코드를 여기에 연동해봐! (ID: {review.id})
        </p>
      </div>
    </div>
  );
}