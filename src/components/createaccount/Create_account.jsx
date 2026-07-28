import { useState } from 'react';
import gitlogo from '../../assets/gitlogo.png';
import googlelogo from '../../assets/googlelogo.png';
import { useRegisterApi } from '../../hooks/RegisterApi';

function Create_account({ isOpen1, onClose1, onSignUpComplete }) {
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

  const { registerUser, isLoading } = useRegisterApi();

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

    // 💡 실제 백엔드 API 호출 (목 데이터 로직 제거 완료)
    const result = await registerUser({
      username: username,
      password: password,
      nickname: name,
      email: fullEmail,
    });

    if (result.success) {
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
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen1 ? 'opacity-100 visible backdrop-blur-[0.46vh]' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className={`relative w-[43vw] min-w-[16.66vw] max-w-[42.7vw] h-[92vh] min-h-[55.5vh] max-h-[83.3vh] bg-gray700 border-white-5 border-2 rounded-md p-[2.22vh] shadow-2xl select-none transition-all duration-500 ease-out overflow-y-auto ${
          isOpen1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-[2.22vh] right-[1.66vw] text-gray400 hover:text-white text-[2.77vh] font-semibold cursor-pointer focus:outline-none transition-all"
        >
          &times;
        </button>

        {/* 헤더 */}
        <div className="text-white font-bold text-[3.24vh] text-center mt-[1.85vh]">회원가입</div>

        {/* 기타/서버 오류 에러 문구 */}
        {generalError && (
          <div className="text-red400 text-center font-semibold text-[1.48vh] mt-[1vh]">
            {generalError}
          </div>
        )}

        {/* 아이디 & 이름 라벨 */}
        <div className="flex justify-between items-center w-full px-[1.66vw] mt-[1.11vh] font-bold text-[1.85vh] text-gray200">
          <div className="flex items-center gap-[0.5vw]">
            <span>아이디</span>
            {usernameError && (
              <span className="text-red400 text-[1.29vh] font-semibold">
                {usernameError}
              </span>
            )}
          </div>
          <span className="text-right pr-[14.79vw]">이름</span>
        </div>

        {/* 아이디 & 이름 입력창 */}
        <div className="w-full flex justify-between px-[2.08vw] mt-[1.11vh] gap-[0.83vw]">
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (usernameError) setUsernameError('');
              if (generalError) setGeneralError('');
            }}
            className={`bg-gray800-50 w-[16vw] max-w-[15.62vw] h-[5.5vh] max-h-[4.63vh] rounded-lg border text-white px-[0.83vw] focus:outline-none transition-all hover:bg-gray700 text-[1.48vh] ${
              usernameError ? 'border-red400' : 'border-white-5'
            }`}
          />
          <input
            name="nickname"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray800-50 w-[16vw] max-w-[15.62vw] h-[5.5vh] max-h-[4.63vh] rounded-lg border border-white-5 text-white px-[0.83vw] focus:outline-none transition-all hover:bg-gray700 text-[1.48vh]"
          />
        </div>

        {/* 이메일 라벨 및 중복 에러 */}
        <div className="text-gray200 text-left font-bold text-[1.85vh] mt-[1.85vh] flex items-center w-full px-[1.66vw] gap-[0.5vw]">
          <span>이메일</span>
          {emailError && (
            <span className="text-red400 text-[1.29vh] font-semibold">
              {emailError}
            </span>
          )}
        </div>

        {/* 이메일 입력 + @ + 도메인 선택 */}
        <div className="w-full flex justify-between items-center px-[2.08vw] mt-[1.11vh] gap-[0.83vw]">
          <input
            name="emailPrefix"
            type="text"
            value={emailPrefix}
            onChange={(e) => {
              setEmailPrefix(e.target.value);
              if (emailError) setEmailError('');
              if (generalError) setGeneralError('');
            }}
            className={`bg-gray800-50 w-[16vw] max-w-[15.62vw] h-[5.5vh] max-h-[4.63vh] rounded-lg border text-white px-[0.83vw] focus:outline-none hover:bg-gray700 transition-all text-[1.48vh] ${
              emailError ? 'border-red400' : 'border-white-5'
            }`}
          />
          <div className="text-gray200 font-bold text-[2.77vh]">@</div>
          <select
            name="emailDomain"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
            className="w-[16vw] max-w-[15.62vw] h-[5.5vh] max-h-[4.63vh] bg-gray800-50 border-white-5 border-2 rounded-md text-white px-[0.83vw] py-[0.74vh] cursor-pointer focus:outline-none hover:bg-gray700 transition-all text-[1.48vh]"
          >
            <option value="" disabled>
              주소를 선택해주세요
            </option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
          </select>
        </div>

        {/* 비밀번호 라벨 */}
        <div className="flex justify-between items-center w-full px-[1.66vw] mt-[1.85vh] font-bold text-[1.85vh] text-gray200">
          비밀번호
        </div>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-[0.83vw] ml-[2.08vw] mt-[1.11vh] w-[37vw] max-w-[36.98vw] h-[5.5vh] max-h-[4.63vh] bg-gray800-50 border border-white-5 rounded-lg focus:outline-none hover:bg-gray700 transition-all text-white text-[1.48vh]"
        />

        {/* 비밀번호 확인 라벨 & 불일치 에러 */}
        <div className="flex justify-between items-center w-full px-[1.66vw] mt-[1.85vh] font-bold text-[1.85vh] text-gray200">
          <div className="flex items-center gap-[0.5vw]">
            <span>비밀번호 확인</span>
            {isPasswordMismatched && (
              <span className="text-red400 text-[1.29vh] font-semibold ml-[0.83vw]">
                비밀번호가 일치하지 않습니다.
              </span>
            )}
          </div>
        </div>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`px-[0.83vw] ml-[2.08vw] mt-[1.11vh] w-[37vw] max-w-[36.98vw] h-[5.5vh] max-h-[4.63vh] bg-gray800-50 border rounded-lg focus:outline-none hover:bg-gray700 transition-all text-white text-[1.48vh] ${
            isPasswordMismatched ? 'border-red400' : 'border-white-5'
          }`}
        />

        {/* 구분선 */}
        <div className="flex justify-between items-center px-[2.08vw] mt-[3.7vh]">
          <hr className="w-[16vw] max-w-[15.62vw] border-gray400"/>
          <div className="flex justify-center font-bold text-gray200 text-[1.85vh]">또는</div>
          <hr className="w-[16vw] max-w-[15.62vw] border-gray400"/>
        </div>

        {/* 소셜 로그인 버튼 (알림창 추가) */}
        <div className="flex justify-between items-center px-[2.08vw] mt-[2.96vh] gap-[0.83vw]">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('외부 페이지로 이동하시겠습니까?')) {
                window.location.href = 'http://cofix.jongyeol.kr/oauth2/authorization/google';
              }
            }}
            className="cursor-pointer border border-white-5 bg-white w-[16vw] max-w-[15.62vw] h-[5.5vh] max-h-[4.63vh] rounded-full font-bold text-[1.29vh] text-black flex justify-center items-center gap-[1.04vw] hover:bg-gray200 transition-all shadow-md focus:outline-none"
          >
            <img src={googlelogo} alt="구글 로고" className="w-[1.66vw] h-[2.96vh] object-contain" />
            <span className="truncate">구글 계정으로 계정생성</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('외부 페이지로 이동하시겠습니까?')) {
                window.location.href = 'http://cofix.jongyeol.kr/oauth2/authorization/github';
              }
            }}
            className="cursor-pointer border border-white-5 bg-white w-[16vw] max-w-[15.62vw] h-[5.5vh] max-h-[4.63vh] rounded-full font-bold text-[1.29vh] text-black flex justify-center items-center gap-[1.04vw] hover:bg-gray200 transition-all shadow-md focus:outline-none"
          >
            <img src={gitlogo} alt="깃허브 로고" className="w-[1.66vw] h-[2.96vh] object-contain" />
            <span className="truncate">깃허브 계정으로 계정생성</span>
          </button>
        </div>

        {/* 계정생성 버튼 */}
        <div className="flex justify-end px-[2.08vw] mt-[3.7vh]">
          <button
            type="button"
            onClick={handleSignUpSubmit}
            disabled={!isFormValid || isLoading}
            className={`w-[8vw] max-w-[7.81vw] h-[7.5vh] max-h-[6.48vh] rounded-4xl border border-white-5 font-bold text-[2.31vh] transition-all focus:outline-none ${
              isFormValid && !isLoading
                ? 'bg-gray800-50 text-purple400 cursor-pointer hover:bg-gray700'
                : 'bg-gray800-50 text-purple400 cursor-not-allowed opacity-60'
            }`}
          >
            {isLoading ? '생성 중...' : '계정생성'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Create_account;