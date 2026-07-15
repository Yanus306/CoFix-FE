import logo from '../../assets/logo.png';

function Login({ isOpen, onClose, onSignUpClick }) {
  
  return (
    <div 
      onClick={onClose}

      className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 visible backdrop-blur-sm' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
     
        className={`relative w-[750px] h-[780px] bg-gray-700 border-white/5 border-2 rounded-md flex justify-center items-center flex-col gap-4 bg-center shadow-2xl select-none transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-white text-3xl font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
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
        
        {/* 아이디 */}
        <div className="text-gray-200 w-full text-left px-20 mt-5 font-bold">아이디</div>
        <input 
          type="text" 
          className="hover:bg-gray-600/50 w-[570px] h-[50px] bg-gray-800/50 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />

        {/* 비밀번호 */}
        <div className="text-gray-200 w-full text-left px-20 mt-5 font-bold">비밀번호</div>
        <input 
          type="password" 
          className="hover:bg-gray-600/50 w-[570px] h-[50px] bg-gray-800/50 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />

        {/* 로그인 버튼 */}
        <button className="w-[290px] h-[80px] bg-gray-800/50 border-white/5 border rounded-4xl cursor-pointer text-purple-400 flex justify-center items-center text-[35px] mt-10 font-bold hover:bg-gray-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
          로그인
        </button>

        {/* 회원가입 링크 */}
        <div className="text-gray-200 w-fit text-center mt-5 text-[13px]">
          <span>계정이 없으신가요? </span>
          <button
            onClick={onSignUpClick} 
            className="text-purple-400 text-[13px] underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            회원가입
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;