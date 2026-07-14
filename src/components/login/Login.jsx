import logo from '../../assets/logo.png';

// 💡 부모 컴포넌트로부터 isOpen과 onClose 상태/함수를 받아옵니다.
function Login({ isOpen, onClose }) {
  
  // 모달이 닫혀 있으면 화면에 아무것도 렌더링하지 않습니다.
  if (!isOpen) return null;

  return (
    /* 1. 어두운 모달 배경 (클릭 시 닫히도록 onClose 실행) */
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-all duration-300"
    >
      {/* 
        2. 실제 로그인 카드 본체 
        - e.stopPropagation()을 넣어 카드 내부를 클릭했을 때 모달이 닫히는 걸 방지합니다.
      */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-[750px] h-[780px] bg-gray-700 border-white/5 border-2 rounded-md flex justify-center items-center flex-col gap-4 bg-center shadow-2xl select-none"
      >
        
        {/* 우측 상단 닫기(X) 버튼 추가 */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-white text-3xl font-semibold cursor-pointer"
        >
          &times;
        </button>

        {/* 로고 영역 */}
        <div className="p-6">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[180px] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>

        {/* 입력 폼 및 버튼 */}
        <div className="text-gray-200 w-full text-left px-20 mt-5">아이디</div>
        <input 
          type="text" 
          className="w-[572px] h-[53px] bg-gray-800 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="text-gray-200 w-full text-left px-20 mt-5">비밀번호</div>
        <input 
          type="password" 
          className="w-[572px] h-[53px] bg-gray-800 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button className="w-[291px] h-[81px] bg-gray-800/50 border-white/5 border rounded-4xl cursor-pointer text-purple-400 flex justify-center items-center text-[35px] mt-10 font-bold hover:bg-gray-600/50 transition">
          로그인
        </button>

        <div className="text-gray-200 w-fit text-center mt-5 text-[13px]">
          <span>계정이 없으신가요? </span>
          <span className="text-blue-500 text-[13px] underline cursor-pointer">회원가입</span>
        </div>

      </div>
    </div>
  );
}

export default Login;