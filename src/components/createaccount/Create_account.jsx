import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useRegisterApi } from '../../hooks/RegisterApi';
import { useLoginApi } from '../../hooks/LoginApi';

function Create_account({ isOpen1, onClose1, onSignUpComplete, onLoginClick }) { 
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 에러 상태 분리
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // 회원가입과 로그인의 로딩 상태를 각각 관리
  const { registerUser, isLoading: isRegisterLoading } = useRegisterApi();
  const { loginUser, isLoading: isLoginLoading } = useLoginApi();
  
  const isLoading = isRegisterLoading || isLoginLoading;

  const resetErrors = () => {
    setUsernameError('');
    setEmailError('');
    setGeneralError('');
  };

  const resetForm = () => {
    setUsername('');
    setName('');
    setEmailPrefix('');
    setEmailDomain('');
    setPassword('');
    setConfirmPassword('');
    resetErrors();
  };

  const handleClose = () => {
    resetForm();
    onClose1();
  };

  const isPasswordMismatched =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const isFormValid =
    username.trim() !== '' &&
    name.trim() !== '' &&
    emailPrefix.trim() !== '' &&
    emailDomain !== '' &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    !isPasswordMismatched;

  const handleSignUpSubmit = async () => {
    if (!isFormValid || isLoading) return;

    resetErrors();

    const fullEmail = `${emailPrefix.trim()}@${emailDomain}`;

    // 실제 백엔드 API 호출
    const result = await registerUser({
      username: username,
      password: password,
      nickname: name,
      email: fullEmail,
    });

    if (result.success) {
      // 회원가입 성공 시 자동 로그인 후 토큰, 닉네임, 아이디, 이메일 저장
      try {
        const loginResult = await loginUser({ username, password });
        
        if (loginResult.success && loginResult.data) {
          const token = loginResult.data.token || loginResult.data.accessToken; 
          
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('nickname', name);
            localStorage.setItem('username', username);
            localStorage.setItem('email', fullEmail); // 💡 회원가입 시 입력한 이메일 저장

            // 계정 관리 모달 호환용 userInfo 객체 저장
            localStorage.setItem('userInfo', JSON.stringify({
              username: username,
              nickname: name,
              email: fullEmail,
            }));

            window.dispatchEvent(new Event('login-success')); // 사이드바 즉시 업데이트 신호
          }
        }
      } catch (error) {
        console.error("자동 로그인 처리 중 오류 발생:", error);
      }

      onSignUpComplete();
      resetForm();
    } else {
      const errorMsg = result.message || '';

      if (errorMsg.includes('username') || errorMsg.includes('아이디')) {
        setUsernameError('이미 존재하는 아이디입니다.');
      } else if (errorMsg.includes('email') || errorMsg.includes('이메일')) {
        setEmailError('이미 존재하는 이메일입니다.');
      } else {
        setGeneralError(errorMsg || '회원가입 처리 중 오류가 발생했습니다.');
      }
    }
  };

  // 엔터키 입력 시 회원가입 제출 함수
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSignUpSubmit();
    }
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center ${
        isOpen1 ? 'opacity-100 visible backdrop-blur-[0.18vh]' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ 
          backgroundImage: 'linear-gradient(135deg, rgba(27, 107, 244, 0.75), rgba(213, 1, 255, 0.75))' 
        }}
        className={`relative w-[39.37vw] max-w-[39.37vw] h-[78vh] max-h-[78vh] p-[2px] rounded-[1rem] shadow-[0_0_70px_rgba(150,50,255,0.6)] select-none transition-all duration-400 ease-out transform ${
          isOpen1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div
          onKeyDown={handleKeyDown}
          className={`w-full h-full bg-[#1F2937] border-white-5 border-2 rounded-[calc(1rem-2px)] flex items-center flex-col pt-[3vh] relative overflow-y-auto transition-opacity duration-500 delay-100 ${
            isOpen1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          
          <button
            onClick={handleClose}
            className="absolute top-[2.22vh] right-[1.66vw] text-gray400 hover:text-white text-[2.77vh] font-semibold cursor-pointer focus:outline-none transition-all z-10"
          >
            &times;
          </button>

          <div className="relative p-0 flex justify-center items-center">
            <div 
              style={{ backgroundImage: 'linear-gradient(135deg, #1B6BF4, #D501FF)' }}
              className="absolute w-[13vh] h-[13vh] rounded-full blur-[15px] opacity-50 pointer-events-none"
            ></div>
            <img 
              src={logo} 
              alt="로고" 
              className="relative w-[12vh] h-[12vh] max-h-[12vh] object-cover rounded-full shadow-lg flex justify-center items-center z-10 border border-white-5"
            />
          </div>

          <div className="text-white font-[800] text-[3.2vh] mt-[1.2vh]">
            회원가입
          </div>

          <div className="text-gray400 font-semibold text-[1.48vh] mt-[0.4vh]">
            CoFix와 함께 더 나은 개발 경험을 시작해보세요.
          </div>

          {generalError && (
            <div className="text-red400 text-center font-semibold text-[1.2vh] mt-[0.8vh]">
              {generalError}
            </div>
          )}

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[1.6vh] relative flex items-center">
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameError) setUsernameError('');
                if (generalError) setGeneralError('');
              }}
              placeholder="아이디를 입력하세요"
              className={`w-full h-[5.09vh] max-h-[5.09vh] bg-[#374151] border rounded-lg pl-[0.83vw] pr-[8vw] text-white placeholder-gray400 focus:outline-none transition-all text-[1.48vh] ${
                usernameError ? 'border-red400' : 'border-white-5'
              }`}
            />
            {usernameError && (
              <span className="absolute right-[1vw] text-red400 text-[1.1vh] font-semibold pointer-events-none">
                {usernameError}
              </span>
            )}
          </div>

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[1.2vh]">
            <input
              name="nickname"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full h-[5.09vh] max-h-[5.09vh] bg-[#374151] border border-white-5 rounded-lg pl-[0.83vw] text-white placeholder-gray400 focus:outline-none transition-all text-[1.48vh]"
            />
          </div>

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[1.2vh] flex items-center gap-[0.5vw]">
            <div className="relative flex items-center grow">
              <input
                name="emailPrefix"
                type="text"
                value={emailPrefix}
                onChange={(e) => {
                  setEmailPrefix(e.target.value);
                  if (emailError) setEmailError('');
                  if (generalError) setGeneralError('');
                }}
                placeholder="이메일"
                className={`w-full h-[5.09vh] max-h-[5.09vh] bg-[#374151] border rounded-lg pl-[0.83vw] pr-[6vw] text-white placeholder-gray400 focus:outline-none transition-all text-[1.48vh] ${
                  emailError ? 'border-red400' : 'border-white-5'
                }`}
              />
              {emailError && (
                <span className="absolute right-[0.8vw] text-red400 text-[1vh] font-semibold pointer-events-none truncate max-w-[9vw]">
                  {emailError}
                </span>
              )}
            </div>
            <div className="text-gray200 font-bold text-[2vh]">@</div>
            <select
              name="emailDomain"
              value={emailDomain}
              onChange={(e) => setEmailDomain(e.target.value)}
              className="w-[11.5vw] h-[5.09vh] max-h-[5.09vh] bg-[#374151] border-white-5 border rounded-lg text-white px-[0.6vw] cursor-pointer focus:outline-none transition-all text-[1.48vh]"
            >
              <option value="" disabled>
                주소 선택
              </option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
            </select>
          </div>

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[1.2vh]">
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full h-[5.09vh] max-h-[5.09vh] bg-[#374151] border border-white-5 rounded-lg pl-[0.83vw] text-white placeholder-gray400 focus:outline-none transition-all text-[1.48vh]"
            />
          </div>

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[1.2vh] relative flex items-center">
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              className={`w-full h-[5.09vh] max-h-[5.09vh] bg-[#374151] border rounded-lg pl-[0.83vw] pr-[5vw] text-white placeholder-gray400 focus:outline-none transition-all text-[1.48vh] ${
                isPasswordMismatched ? 'border-red400' : 'border-white-5'
              }`}
            />
            {isPasswordMismatched && (
              <span className="absolute right-[1vw] text-red400 text-[1.1vh] font-semibold pointer-events-none">
                불일치
              </span>
            )}
          </div>

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[2.2vh]">
            <button
              type="button"
              onClick={handleSignUpSubmit}
              disabled={!isFormValid || isLoading}
              style={{ backgroundImage: 'linear-gradient(to right, #1B6BF4, #D501FF)' }}
              className={`w-full h-[7vh] max-h-[7vh] border-white-5 border rounded-4xl text-white flex justify-center items-center text-[2.05vh] font-bold transition-all focus:outline-none shadow-md ${
                isFormValid && !isLoading
                  ? 'cursor-pointer opacity-90 hover:opacity-100'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              {isLoading ? '생성 중...' : '계정생성'}
            </button>
          </div>

          <div className="text-gray200 w-fit text-center mt-[3vh] text-[1.5vh]">
            <span>이미 계정이 있으신가요? </span>
            <button
              type="button"
              onClick={() => {
                if (onLoginClick) {
                  onLoginClick();
                } else {
                  handleClose();
                }
              }} 
              className="text-sky-400 text-[1.5vh] underline cursor-pointer focus:outline-none ml-[0.1vw]"
            >
              로그인하러가기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Create_account;