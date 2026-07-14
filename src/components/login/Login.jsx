import logo from '../../assets/logo.png';

function Login() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
    <div className="w-[750px] h-[780px] bg-gray-700 border-white/5 border-2 rounded-md flex justify-center items-center flex-col gap-4 bg-center">
    
<div className="p-6">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[180px] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>

          <div className="text-gray-200 w-full text-left px-20 mt-5">아이디</div>
      <input type="text" className="w-[572px] h-[53px] bg-gray-800 border-white/5 border-1 rounded-lg cursor-pointer pl-4"></input>
   <div className="text-gray-200 w-full text-left px-20 mt-5">비밀번호</div>
      <input type="password" className="w-[572px] h-[53px] bg-gray-800 border-white/5 border-1 rounded-lg cursor-pointer pl-4"></input>
    <button className="w-[291px] h-[81px] bg-gray-800/50 border-white/5 border-1 rounded-4xl cursor-pointer text-purple-400 flex justify-center items-center text-[35px] mt-10 font-bold hover:bg-gray-600/50 text-grenn-400 transition">로그인</button>
          <div className="text-gray-200 w-fit text-center mt-5 text-[13px]"><span>계정이 없으신가요? </span>
          <span className="text-blue-500 text-[13px] underline cursor-pointer">회원가입</span>
          </div>
</div>
  </div>
  );
}

export default Login;