import { useEffect, useState } from "react";

function IdeCode() {
  const authCode = "asd0fghjkl123asdf45gh67j8k9l";
  const [copyStatus, setCopyStatus] = useState(
    "아래 인증코드를 IDE에 삽입해주세요",
  );

  useEffect(() => {
    // 복사 시도 함수
    const attemptCopy = async () => {
      try {
        await navigator.clipboard.writeText(authCode);
        setCopyStatus("인증 코드가 클립보드에 자동 복사되었습니다!");
      } catch (err) {
        // 보안 정책 때문에 자동 복사가 막혔을 경우
        console.warn("자동 복사 대기 중: 인증코드 칸을 클릭하면 복사됩니다.");
      }
    };

    attemptCopy();
  }, []);

  // 인증 코드 칸 클릭하면 복사
  const copyOnFirstInteraction = async () => {
    try {
      await navigator.clipboard.writeText(authCode);
      setCopyStatus("인증 코드가 클립보드에 복사되었습니다!");
    } catch (e) {
      console.error("복사 실패:", e);
    } finally {
      // 중복 방지
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full select-none">
      <div className="panel-base no-hover justify-center w-[33.80vw] h-[29.72vh] gap-[1vh]">
        <div className="text-white font-bold text-[2.59vh]">IDE 인증 코드</div>

        <div className="mb-[1vh] text-gray400 text-[2.22vh]">{copyStatus}</div>

        <div
          onClick={copyOnFirstInteraction}
          className="flex justify-center items-center w-[26.5625vw] h-[5.5556vh] gap-[1vw] bg-white-3 border-[0.09vh] border-white-5 rounded-[1.04vw] cursor-pointer hover:bg-white-5"
        >
          <div className=" text-gray400 text-[1.8519vh]">{authCode}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[2vh] h-[2vh] text-gray400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default IdeCode;
