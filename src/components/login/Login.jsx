import logo from '../../assets/logo.png';

function Login({ isOpen, onClose, onSignUpClick }) {
  
  return (
    // 1. bg-black을 반투명한 bg-black/50으로 바꾸고, 블러 효과를 은은하게 [2px]로 조정 완료!
    <div 
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 visible backdrop-blur-[2px]' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      {/* 로그인 모달 컨테이너 (내부 클릭 시 닫힘 방지) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[39vw] min-w-[320px] max-w-[750px] h-[80vh] min-h-[500px] max-h-[780px] bg-gray700 border-white-5 border-2 rounded-md flex justify-center items-center flex-col gap-4 bg-center shadow-2xl select-none transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        
        {/* 모달 우측 상단 닫기(X) 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-gray400 hover:text-white text-3xl font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple500 transition-all"
        >
          &times;
        </button>
        
        {/* 로고 */}
        <div className="p-6">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[18vh] max-h-[180px] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>
        
        {/* 아이디 입력 영역 */}
        <div className="text-gray200 w-full text-left px-20 mt-5 font-bold">아이디</div>
        <input 
          type="text" 
          className="hover:bg-gray-600/50 w-[30vw] max-w-[570px] h-[5vh] max-h-[50px] bg-gray800-50 border-white-5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple500 transition-all"
        />

        {/* 비밀번호 입력 영역 */}
        <div className="text-gray200 w-full text-left px-20 mt-5 font-bold">비밀번호</div>
        <input 
          type="password" 
          className="hover:bg-gray-600/50 w-[30vw] max-w-[570px] h-[5vh] max-h-[50px] bg-gray800-50 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple500 transition-all"
        />

        {/* 로그인 실행 버튼 */}
        <button 
          className="w-[15vw] max-w-[290px] h-[8vh] max-h-[80px] bg-gray800-50 border-white-5 border rounded-4xl cursor-pointer text-purple400 flex justify-center items-center text-[35px] mt-10 font-bold hover:bg-gray-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple500"
        >
          로그인
        </button>

        {/* 회원가입 모달 전환 유도 영역 */}
        <div className="text-gray-200 w-fit text-center mt-5 text-[13px]">
          <span>계정이 없으신가요? </span>
          <button
            onClick={onSignUpClick} 
            className="text-purple400 text-[13px] underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple500 hover:text-purple400"
          >
            회원가입
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;