// 💡 부모 컴포넌트에게서 'onOpenLogin' 함수를 인자로 받아옵니다.
function NotLoggedIn({ onOpenLogin }) {
  return (
    <div className="flex justify-center items-center w-full h-full select-none">
      <div className="panel-base no-hover justify-center w-[33.80vw] h-[29.72vh] gap-[2.04vh]">
        <div className="text-white font-bold text-[2.59vh]">
          로그인이 되어 있지 않습니다.
        </div>
        <div className="flex text-gray400 text-[2.22vh]">
          {/* 
            💡 [로그인] 글씨를 클릭했을 때 부모의 모달 열기 상태를 true로 바꿔줍니다.
               onClick={onOpenLogin} 을 추가했습니다.
          */}
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