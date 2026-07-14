import gitlogo from '../../assets/gitlogo.png';
import googlelogo from '../../assets/googlelogo.png';




function Create_account() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
<div className = "w-[820px] h-[900px] bg-gray-700 border-white/5 border-1 rounded-lg">

    <div className = "text-white font-bold text-[35px] flext text-center mt-5">회원가입</div>

<div className ="flex justify-between items-center w-full px-8 mt-3 font-bold text-[20px] text-gray-200">
<span className="text-left">아이디</span>
<span className ="text-right px-70">이름</span></div>
<span className= "w-full flex justify-between px-10 mt-3">
<input type="text" className="bg-gray-800/50 w-[300px] h-[50px] cursor-pointer rounded-lg border-1 border-white/5 text-white px-4"></input>
<input type="text" className="bg-gray-800/50 w-[300px] h-[50px] cursor-pointer rounded-lg border-1 border-white/5 text-white px-4"></input>
</span>

<div className= "text-gray200 text-left font-bold text-[20px] mt-5 flex justify-between items-center w-full px-8 ">이메일</div>
<span className= "w-full flex justify-between items-center px-10 mt-3">
<input type="text" className="bg-gray-800/50 w-[300px] h-[50px] cursor-pointer rounded-lg border-1 border-white/5 text-white px-4"></input>
<div className="text-gray-200 font-bold text-[30px]">@</div>
<select className="w-[300px] h-[50px] bg-gray-800/50 border-white/5 border-2 rounded-md text-white px-4 py-2 cursor-pointer">
  <option value="">gamil.com</option>
  <option value="skt">naver.com</option>
  <option value="kt">daum.com</option>
</select>
</span>

<div className ="flex justify-between items-center w-full px-8 mt-5 font-bold text-[20px] text-gray-200">비밀번호</div>
<input type="password" className="px-4 ml-10 mt-3 w-[750px] h-[50px] bg-gray-800/50 border-1 border-white/5 rounded-lg"></input>
<div className ="flex justify-between items-center w-full px-8 mt-5 font-bold text-[20px] text-gray-200">비밀번호 확인</div>
<input type="password" className="px-4 ml-10 mt-3 w-[750px] h-[50px] bg-gray-800/50 border-1 border-white/5 rounded-lg"></input>

<span className = "flex justify-between items-center px-10 mt-10">
<hr className="w-[300px] border-gray-200"/>
<div className ="flex justify-center font-bold text-gray-200 text-[20px]">또는</div>
<hr className="w-[300px] border-gray-200"/>
</span>

<span className ="flex justify-between items-center px-10 mt-15">
<button className="cursor-pointer border-[1px] border-white/5 bg-white w-[250px] h-[50px] rounded-full font-bold text-[14px] text-black flex justify-center items-center gap-5 hover:bg-gray-100 transition-all shadow-md">
  <img 
    src={googlelogo} 
    alt="구글 로고" 
    className="w-10 h-10 object-contain" 
  />

  <span>구글 계정으로 계정생성</span>
</button>
   
<button className="cursor-pointer border-[1px] border-white/5 bg-white w-[250px] h-[50px] rounded-full font-bold text-[14px] text-black flex justify-center items-center gap-5 hover:bg-gray-100 transition-all shadow-md">
  <img 
    src={gitlogo} 
    alt="깃허브 로고" 
    className="w-10 h-10 object-contain" 
  />

  <span>깃허브 계정으로 계정생성</span>
</button>
</span>
<button className = "mt-25 ml-auto mr-10 flex justify-center items-center bg-gray-800/50 w-[150px] h-[70px] rounded-4xl border-1 border-white/5 text-purple-400 font-bold text-[25px] hover:bg-gray-600/50 transition-all">계정생성</button>

</div>
</div>
  );
}
export default Create_account; 