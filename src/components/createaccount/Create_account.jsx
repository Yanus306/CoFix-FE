import { useState, useEffect } from 'react';
import gitlogo from '../../assets/gitlogo.png';
import googlelogo from '../../assets/googlelogo.png';

function Create_account({ isOpen1, onClose1, onSignUpComplete}) {
  // 모든 입력 필드를 state로 제어 (양방향 바인딩)
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 💡 모달이 닫힐 때 모든 값을 원래대로 초기화하는 함수
  const resetForm = () => {
    setUsername('');
    setName('');
    setEmailPrefix('');
    setEmailDomain('gmail.com');
    setPassword('');
    setConfirmPassword('');
  };

  // 모달 닫기 버튼용 핸들러
  const handleClose = () => {
    resetForm(); // 값 비우고
    onClose1();  // 창 닫기
  };

  // 💡 1. 계정 생성 유효성 검사 (입력창들이 비어있거나, 비밀번호가 불일치하면 false)
  const isFormValid = 
    username.trim() !== '' &&
    name.trim() !== '' &&
    emailPrefix.trim() !== '' &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  // 최종 계정 생성용 핸들러
  const handleSignUpSubmit = () => {
    // 💡 2. 방어 코드: 폼이 유효하지 않으면 함수 실행을 강제로 막음
    if (!isFormValid) return;

    onSignUpComplete(); // 완료 창 띄우고
    resetForm();        // 값 비우기
  };

  const isPasswordMismatched = 
    password.length > 0 && 
    confirmPassword.length > 0 && 
    password !== confirmPassword;

  return (
    // 아웃사이드 클릭 시에도 handleClose를 실행해서 청소하게 만듦
    <div 
      onClick={handleClose}
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen1 ? 'opacity-100 visible backdrop-blur-[5px]' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[43vw] min-w-[350px] max-w-[820px] h-[92vh] min-h-[600px] max-h-[900px] bg-gray700 border-white-5 border-2 rounded-lg p-6 shadow-2xl select-none transition-all duration-500 ease-out overflow-y-auto ${
          isOpen1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        
        {/* 우측 상단 닫기(X) 버튼 */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-white text-3xl font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple500 transition-all"
        >
          &times;
        </button>

        <div className="text-white font-bold text-[35px] text-center mt-5">회원가입</div>

        {/* 아이디 / 이름 라벨 */}
        <div className="flex justify-between items-center w-full px-8 mt-3 font-bold text-[20px] text-gray-200">
          <span className="text-left">아이디</span>
          <span className="text-right pr-71">이름</span>
        </div>
        
        {/* 아이디 / 이름 입력 영역 */}
        <span className="w-full flex justify-between px-10 mt-3 gap-4">
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray800-50 w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] cursor-pointer rounded-lg border border-white-5 text-white px-4 focus:outline-none focus:ring-2 focus:ring-purple500 transition-all hover:bg-gray-600/50" 
          />
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray800-50 w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] cursor-pointer rounded-lg border border-white-5 text-white px-4 focus:outline-none focus:ring-2 focus:ring-purple500 transition-all hover:bg-gray-600/50" 
          />
        </span>

        {/* 이메일 영역 */}
        <div className="text-gray-200 text-left font-bold text-[20px] mt-5 flex justify-between items-center w-full px-8">이메일</div>
        <span className="w-full flex justify-between items-center px-10 mt-3 gap-4">
          <input 
            type="email"
            value={emailPrefix}
            onChange={(e) => setEmailPrefix(e.target.value)}
            className="bg-gray800-50 w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] cursor-pointer rounded-lg border border-white-5 text-white px-4 focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all" 
          />
          <div className="text-gray-200 font-bold text-[30px]">@</div>
          <select 
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
            className="w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] bg-gray800-50 border-white-5 border-2 rounded-md text-white px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all"
          >
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
          </select>
        </span>

        {/* 비밀번호 영역 */}
        <div className="flex justify-between items-center w-full px-8 mt-5 font-bold text-[20px] text-gray-200">비밀번호</div>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 ml-10 mt-3 w-[37vw] max-w-[710px] h-[5.5vh] max-h-[50px] bg-gray800-50 border border-white-5 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all text-white" 
        />
        
        {/* 비밀번호 확인 영역 */}
        <div className="flex justify-between items-center w-full px-8 mt-5 font-bold text-[20px] text-gray-200">
          <span>비밀번호 확인</span>
          {isPasswordMismatched && (
            <span className="text-red-400 text-sm font-semibold ml-4">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </div>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 ml-10 mt-3 w-[37vw] max-w-[710px] h-[5.5vh] max-h-[50px] bg-gray800-50 border border-white-5 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all text-white" 
        />

        {/* 구분선 */}
        <span className="flex justify-between items-center px-10 mt-10">
          <hr className="w-[16vw] max-w-[300px] border-gray400"/>
          <div className="flex justify-center font-bold text-gray-200 text-[20px]">또는</div>
          <hr className="w-[16vw] max-w-[300px] border-gray400"/>
        </span>

        {/* 소셜 회원가입 */}
        <span className="flex justify-between items-center px-10 mt-8 gap-4">
          <button className="cursor-pointer border border-white-5 bg-white w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] rounded-full font-bold text-[14px] text-black flex justify-center items-center gap-5 hover:bg-gray-200 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple500">
            <img src={googlelogo} alt="구글 로고" className="w-8 h-8 object-contain" />
            <span className="truncate">구글 계정으로 계정생성</span>
          </button>
          <button className="cursor-pointer border border-white-5 bg-white w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] rounded-full font-bold text-[14px] text-black flex justify-center items-center gap-5 hover:bg-gray-200 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple500">
            <img src={gitlogo} alt="깃허브 로고" className="w-8 h-8 object-contain" />
            <span className="truncate">깃허브 계정으로 계정생성</span>
          </button>
        </span>

        {/* 최종 계정생성 버튼 */}
        <div className="flex justify-end px-10 mt-10">
          <button 
            onClick={handleSignUpSubmit} 
            disabled={!isFormValid} // 💡 3. 버튼 자체를 비활성화 시키는 비장의 무기
            className={`w-[8vw] max-w-[150px] h-[7.5vh] max-h-[70px] rounded-4xl border border-white-5 font-bold text-[25px] transition-all focus:outline-none focus:ring-2 focus:ring-purple500 ${
              isFormValid 
                ? 'bg-gray800-50 text-purple400 cursor-pointer hover:bg-gray-600/50' 
                : 'bg-gray800/20 text-purple400/30 cursor-not-allowed opacity-60' // 💡 4. 비활성화 시 스타일
            }`}
          >
            계정생성
          </button>
        </div>

      </div>
    </div>
  );
}

export default Create_account;