export default function ReviewDetail({ review }) {
  if (!review) return null;

  return (
    <div
      key={review.id}
      className="w-[183%] h-[79vh] border border-purple500/20 rounded-3xl p-[2.5vw] flex flex-col gap-[1.5vh] text-white animate-fade-in duration-300"
    >
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
            <span className="text-gray400 mr-[0.3vw]">발생일:</span>{review.date}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[0.6vh]">
        <div className="text-gray400 text-[1.55vh]">문제코드</div>
        {/* 임시 코드 공백 */}
        <div className="w-full h-[26vh] border border-dashed border-gray700 rounded-2xl flex items-center justify-center text-gray600 text-[1.5vh]">
          (코드 영역 스킵)

        </div>

      </div>



      <div className="flex flex-col gap-[1.2vh] mt-[0.2vh]">

        <div className="flex justify-between items-center w-full">

          <div className="flex flex-col gap-[0.4vh]">

            <div className="text-gray200 text-[2.35vh] font-semibold">

              개념 요약 및 가이드

            </div>

            <div className="text-gray500 text-[1.3vh] text-gray400">

             Ai가 분석한 실수의 개념 요약입니다. 내용을 확인하고 수정하며, 나만의 정리본을 만들어 보세요.

            </div>

          </div>

         

          {/* 임시 가이드 공백 */}

          <div className="flex items-center gap-[0.6vw]">

            <button className="px-[0.9vw] py-[0.5vh] rounded-xl bg-red500-10 text-red400 text-[1.4vh] transition-all border border-solid border-red-500/20 cursor-pointer">

              취소

            </button>

            <button className="px-[0.9vw] py-[0.5vh] rounded-xl bg-purple500/10 text-purple400 text-[1.4vh] transition-all border border-solid border-purple500/20 cursor-pointer">

              저장

            </button>

          </div>

        </div>

       

        <div className="w-full h-[21vh] border border-dashed border-gray700 rounded-2xl flex items-center justify-center text-gray600 text-[1.5vh]">

          (가이드 영역 스킵)

        </div>

      </div>

    </div>

  );

}