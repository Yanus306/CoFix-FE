function NotLoggedIn({ onOpenLogin }) {
  return (
    <div className="flex justify-center items-center w-full h-full select-none">
      <div className="panel-base no-hover justify-center w-[33.80vw] h-[29.72vh] gap-[2.04vh]">
        <div className="text-white font-bold text-[2.59vh]">
          로그인이 되어 있지 않습니다.
        </div>
        <div className="flex text-gray400 text-[2.22vh]">

          <div 
            onClick={onOpenLogin}
            className="font-bold cursor-pointer underline not-only-of-type:decoration-[0.09vh]"
          >
            로그인
          </div>
          <div>을 진행해 주세요.</div>
        </div>
      </div>
    </div>
  );
}

export default NotLoggedIn;