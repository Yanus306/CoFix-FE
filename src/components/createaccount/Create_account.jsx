import gitlogo from '../../assets/gitlogo.png';
import googlelogo from '../../assets/googlelogo.png';

function Create_account({ isOpen1, onClose1 }) {

  return (
    <div 
      onClick={onClose1}

      className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen1 ? 'opacity-100 visible backdrop-blur-sm' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[820px] h-[900px] bg-gray-700 border-white/5 border-2 rounded-lg p-6 shadow-2xl select-none transition-all duration-500 ease-out ${
          isOpen1 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
       
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose1}
          className="absolute top-6 right-8 text-gray-400 hover:text-white text-3xl font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        >
          &times;
        </button>

        <div className="text-white font-bold text-[35px] text-center mt-5">회원가입</div>

        {/* 아이디 / 이름 */}
        <div className="flex justify-between items-center w-full px-8 mt-3 font-bold text-[20px] text-gray-200">
          <span className="text-left">아이디</span>
          <span className="text-right px-70">이름</span>
        </div>
        <span className="w-full flex justify-between px-10 mt-3">
          <input type="text" className="bg-gray-800/50 w-[300px] h-[50px] cursor-pointer rounded-lg border border-white/5 text-white px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-gray-600/50 "></input>
          <input type="text" className="bg-gray-800/50 w-[300px] h-[50px] cursor-pointer rounded-lg border border-white/5 text-white px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-gray-600/50"></input>
        </span>

        {/* 이메일 */}
        <div className="text-gray-200 text-left font-bold text-[20px] mt-5 flex justify-between items-center w-full px-8 ">이메일</div>
        <span className="w-full flex justify-between items-center px-10 mt-3">
          <input type="text" className="bg-gray-800/50 w-[300px] h-[50px] cursor-pointer rounded-lg border border-white/5 text-white px-4 focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple-500 transition-all"></input>
          <div className="text-gray-200 font-bold text-[30px]">@</div>
          <select className="w-[300px] h-[50px] bg-gray-800/50 border-white/5 border-2 rounded-md text-white px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple-500 transition-all">
            <option value="">gmail.com</option>
            <option value="naver">naver.com</option>
            <option value="daum">daum.com</option>
          </select>
        </span>

        {/* 비밀번호 */}
        <div className="flex justify-between items-center w-full px-8 mt-5 font-bold text-[20px] text-gray-200">비밀번호</div>
        <input type="password" className="px-4 ml-10 mt-3 w-[710px] h-[50px] bg-gray-800/50 border border-white/5 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple-500 transition-all"></input>
        
        {/* 비밀번호 확인 */}
        <div className="flex justify-between items-center w-full px-8 mt-5 font-bold text-[20px] text-gray-200">비밀번호 확인</div>
        <input type="password" className="px-4 ml-10 mt-3 w-[710px] h-[50px] bg-gray-800/50 border border-white/5 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple-500 transition-all"></input>

        {/* 구분선 */}
        <span className="flex justify-between items-center px-10 mt-10">
          <hr className="w-[300px] border-gray-500"/>
          <div className="flex justify-center font-bold text-gray-200 text-[20px]">또는</div>
          <hr className="w-[300px] border-gray-500"/>
        </span>

        {/* 소셜 회원가입 버튼 */}
        <span className="flex justify-between items-center px-10 mt-8">
          <button className="cursor-pointer border border-white/5 bg-white w-[300px] h-[50px] rounded-full font-bold text-[14px] text-black flex justify-center items-center gap-5 hover:bg-gray-200 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500">
            <img src={googlelogo} alt="구글 로고" className="w-8 h-8 object-contain" />
            <span>구글 계정으로 계정생성</span>
          </button>
            
          <button className="cursor-pointer border border-white/5 bg-white w-[300px] h-[50px] rounded-full font-bold text-[14px] text-black flex justify-center items-center gap-5 hover:bg-gray-200 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500">
            <img src={gitlogo} alt="깃허브 로고" className="w-8 h-8 object-contain" />
            <span>깃허브 계정으로 계정생성</span>
          </button>
        </span>

        {/* 최종 제출 버튼 */}
        <div className="flex justify-end px-10 mt-10">
          <button className="bg-gray-800/50 w-[150px] h-[70px] rounded-4xl border border-white/5 text-purple-400 font-bold text-[25px] hover:bg-gray-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
            계정생성
          </button>
        </div>

      </div>
    </div>
  );
}

export default Create_account;