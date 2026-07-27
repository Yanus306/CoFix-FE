import logo from '../../assets/logo.png';

function Login({ isOpen, onClose, onSignUpClick, onLoginSuccess }) {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onLoginSuccess();
    }
  };

  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 visible backdrop-blur-[2px]' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[39vw] min-w-[320px] max-w-[750px] h-[80vh] min-h-[500px] max-h-[780px] bg-gray700 border-white-5 border-2 rounded-md flex justify-center items-center flex-col gap-[1.48vh] bg-center shadow-2xl select-none transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        
        <button 
          onClick={onClose}
          className="absolute top-[2.22vh] right-[1.66vw] text-gray400 hover:text-white text-[2.77vh] font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple500 transition-all"
        >
          &times;
        </button>
        
        <div className="p-[2.4vh]">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[18vh] max-h-[180px] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>
        
        <div className="text-gray200 w-full text-left px-[4.16vw] mt-[1.85vh] font-bold text-[1.85vh]">아이디</div>
        <input 
          type="text" 
          onKeyDown={handleKeyDown}
          className="hover:bg-gray-600/50 w-[30vw] max-w-[570px] h-[5vh] max-h-[50px] bg-gray800-50 border-white-5 border rounded-lg cursor-pointer pl-[0.83vw] text-white focus:outline-none focus:ring-2 focus:ring-purple500 transition-all text-[1.66vh]"
        />

        <div className="text-gray200 w-full text-left px-[4.16vw] mt-[1.85vh] font-bold text-[1.85vh]">비밀번호</div>
        <input 
          type="password" 
          onKeyDown={handleKeyDown}
          className="hover:bg-gray-600/50 w-[30vw] max-w-[570px] h-[5vh] max-h-[50px] bg-gray800-50 border-white/5 border rounded-lg cursor-pointer pl-[0.83vw] text-white focus:outline-none focus:ring-2 focus:ring-purple500 transition-all text-[1.66vh]"
        />

        <button 
          onClick={onLoginSuccess}
          className="w-[15vw] max-w-[290px] h-[8vh] max-h-[80px] bg-gray800-50 border-white-5 border rounded-4xl cursor-pointer text-purple400 flex justify-center items-center text-[3.24vh] mt-[3.7vh] font-bold hover:bg-gray-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple500"
        >
          로그인
        </button>

        <div className="text-gray-200 w-fit text-center mt-[1.85vh] text-[1.2vh]">
          <span>계정이 없으신가요? </span>
          <button
            onClick={onSignUpClick} 
            className="text-purple400 text-[1.2vh] underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple500"
          >
            회원가입
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;