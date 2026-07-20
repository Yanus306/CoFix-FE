import { useState, useEffect } from 'react';
import gitlogo from '../../assets/gitlogo.png';
import googlelogo from '../../assets/googlelogo.png';

function Create_account({ isOpen1, onClose1, onSignUpComplete}) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetForm = () => {
    setUsername('');
    setName('');
    setEmailPrefix('');
    setEmailDomain('gmail.com');
    setPassword('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    resetForm();
    onClose1();
  };

  const isFormValid = 
    username.trim() !== '' &&
    name.trim() !== '' &&
    emailPrefix.trim() !== '' &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSignUpSubmit = () => {
    if (!isFormValid) return;

    onSignUpComplete();
    resetForm();
  };

  const isPasswordMismatched = 
    password.length > 0 && 
    confirmPassword.length > 0 && 
    password !== confirmPassword;

  return (
    <div 
      onClick={handleClose}
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen1 ? 'opacity-100 visible backdrop-blur-[0.46vh]' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[43vw] min-w-[320px] max-w-[820px] h-[92vh] min-h-[600px] max-h-[900px] bg-gray700 border-white-5 border-2 rounded-md p-[2.22vh] shadow-2xl select-none transition-all duration-500 ease-out overflow-y-auto ${
          isOpen1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        
        <button 
          onClick={handleClose}
          className="absolute top-[2.22vh] right-[1.66vw] text-gray-400 hover:text-white text-[2.77vh] font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple500 transition-all"
        >
          &times;
        </button>

        <div className="text-white font-bold text-[3.24vh] text-center mt-[1.85vh]">회원가입</div>

        <div className="flex justify-between items-center w-full px-[1.66vw] mt-[1.11vh] font-bold text-[1.85vh] text-gray-200">
          <span className="text-left">아이디</span>
          <span className="text-right pr-[14.79vw]">이름</span>
        </div>
        
        <span className="w-full flex justify-between px-[2.08vw] mt-[1.11vh] gap-[0.83vw]">
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray800-50 w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] cursor-pointer rounded-lg border border-white-5 text-white px-[0.83vw] focus:outline-none focus:ring-2 focus:ring-purple500 transition-all hover:bg-gray-600/50 text-[1.48vh]" 
          />
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray800-50 w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] cursor-pointer rounded-lg border border-white-5 text-white px-[0.83vw] focus:outline-none focus:ring-2 focus:ring-purple500 transition-all hover:bg-gray-600/50 text-[1.48vh]" 
          />
        </span>

        <div className="text-gray-200 text-left font-bold text-[1.85vh] mt-[1.85vh] flex justify-between items-center w-full px-[1.66vw]">이메일</div>
        <span className="w-full flex justify-between items-center px-[2.08vw] mt-[1.11vh] gap-[0.83vw]">
          <input 
            type="email"
            value={emailPrefix}
            onChange={(e) => setEmailPrefix(e.target.value)}
            className="bg-gray800-50 w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] cursor-pointer rounded-lg border border-white-5 text-white px-[0.83vw] focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all text-[1.48vh]" 
          />
          <div className="text-gray-200 font-bold text-[2.77vh]">@</div>
          <select 
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
            className="w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] bg-gray800-50 border-white-5 border-2 rounded-md text-white px-[0.83vw] py-[0.74vh] cursor-pointer focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all text-[1.48vh]"
          >
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
          </select>
        </span>

        <div className="flex justify-between items-center w-full px-[1.66vw] mt-[1.85vh] font-bold text-[1.85vh] text-gray-200">비밀번호</div>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-[0.83vw] ml-[2.08vw] mt-[1.11vh] w-[37vw] max-w-[710px] h-[5.5vh] max-h-[50px] bg-gray800-50 border border-white-5 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all text-white text-[1.48vh]" 
        />
        
        <div className="flex justify-between items-center w-full px-[1.66vw] mt-[1.85vh] font-bold text-[1.85vh] text-gray-200">
          <span>비밀번호 확인</span>
          {isPasswordMismatched && (
            <span className="text-red-400 text-[1.29vh] font-semibold ml-[0.83vw]">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </div>
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-[0.83vw] ml-[2.08vw] mt-[1.11vh] w-[37vw] max-w-[710px] h-[5.5vh] max-h-[50px] bg-gray800-50 border border-white-5 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-600/50 focus:ring-purple500 transition-all text-white text-[1.48vh]" 
        />

        <span className="flex justify-between items-center px-[2.08vw] mt-[3.7vh]">
          <hr className="w-[16vw] max-w-[300px] border-gray400"/>
          <div className="flex justify-center font-bold text-gray-200 text-[1.85vh]">또는</div>
          <hr className="w-[16vw] max-w-[300px] border-gray400"/>
        </span>

        <span className="flex justify-between items-center px-[2.08vw] mt-[2.96vh] gap-[0.83vw]">
          <button className="cursor-pointer border border-white-5 bg-white w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] rounded-full font-bold text-[1.29vh] text-black flex justify-center items-center gap-[1.04vw] hover:bg-gray-200 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple500">
            <img src={googlelogo} alt="구글 로고" className="w-[1.66vw] h-[2.96vh] object-contain" />
            <span className="truncate">구글 계정으로 계정생성</span>
          </button>
          <button className="cursor-pointer border border-white-5 bg-white w-[16vw] max-w-[300px] h-[5.5vh] max-h-[50px] rounded-full font-bold text-[1.29vh] text-black flex justify-center items-center gap-[1.04vw] hover:bg-gray-200 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple500">
            <img src={gitlogo} alt="깃허브 로고" className="w-[1.66vw] h-[2.96vh] object-contain" />
            <span className="truncate">깃허브 계정으로 계정생성</span>
          </button>
        </span>

        <div className="flex justify-end px-[2.08vw] mt-[3.7vh]">
          <button 
            onClick={handleSignUpSubmit} 
            disabled={!isFormValid}
            className={`w-[8vw] max-w-[150px] h-[7.5vh] max-h-[70px] rounded-4xl border border-white-5 font-bold text-[2.31vh] transition-all focus:outline-none focus:ring-2 focus:ring-purple500 ${
              isFormValid 
                ? 'bg-gray800-50 text-purple400 cursor-pointer hover:bg-gray-600/50' 
                : 'bg-gray800/20 text-purple400/30 cursor-not-allowed opacity-60'
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