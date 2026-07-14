import logo from '../../assets/logo.png';

function Login({ isOpen, onClose, onSignUpClick }) {
  
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-all duration-300"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-[750px] h-[780px] bg-gray-700 border-white/5 border-2 rounded-md flex justify-center items-center flex-col gap-4 bg-center shadow-2xl select-none"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-white text-3xl font-semibold cursor-pointer"
        >
          &times;
        </button>

        <div className="p-6">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[180px] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>
        
        <div className="text-gray-200 w-full text-left px-20 mt-5">아이디</div>
        <input 
          type="text" 
          className="w-[572px] h-[53px] bg-gray-800 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />

        <div className="text-gray-200 w-full text-left px-20 mt-5">비밀번호</div>
        <input 
          type="password" 
          className="w-[572px] h-[53px] bg-gray-800 border-white/5 border rounded-lg cursor-pointer pl-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />

        <button className="w-[291px] h-[81px] bg-gray-800/50 border-white/5 border rounded-4xl cursor-pointer text-purple-400 flex justify-center items-center text-[35px] mt-10 font-bold hover:bg-gray-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
          로그인
        </button>

        <div className="text-gray-200 w-fit text-center mt-5 text-[13px]">
          <span>계정이 없으신가요? </span>
    
          <span 
            onClick={onSignUpClick} 
            className="text-blue-500 text-[13px] underline cursor-pointer"
          >
            회원가입
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;