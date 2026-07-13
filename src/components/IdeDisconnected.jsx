function IdeDisconnected() {
  return (
    <div className="flex justify-center items-center w-full h-full select-none">
      <div className="panel-base no-hover justify-center w-[33.80vw] h-[29.72vh] gap-[2.04vh]">
        <div className="text-white font-bold text-[2.59vh]">
          IDE에 연결 되어 있지 않습니다.
        </div>
        <div className="text-gray400 text-[2.22vh]">연결을 확인해 주세요.</div>
      </div>
    </div>
  );
}

export default IdeDisconnected;
