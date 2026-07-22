import VscodeIcon from "../assets/vscodeIcon.webp";

function IdeDisconnected() {
  return (
    <div className="flex justify-center items-center w-full h-full select-none">
      <div className="panel-base no-hover justify-center w-[33.80vw] h-[29.72vh] gap-[3.056vh]">
        <div className="flex flex-col items-center w-full gap-[1vh]">
          <div className="text-white font-bold text-[2.59vh]">
            IDE 연결이 필요합니다.
          </div>
          <div className="text-gray400 text-[2.22vh]">
            IDE를 선택해 이동 후, 프로그램을 연결해 주세요.
          </div>
        </div>

        <a 
          href="vscode://" 
          className="flex flex-col items-center gap-[0.926vh] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={VscodeIcon} alt="VSCode 실행" className="w-[5.37vh] h-[5.37vh]" />
          <div className="text-gray400 text-[1.11vh]">Visual Studio Code</div>
        </a>
      </div>
    </div>
  );
}

export default IdeDisconnected;