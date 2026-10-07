import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useLoginApi } from '../../hooks/LoginApi';

function Login({ isOpen, onClose, onSignUpClick, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const { loginUser, isLoading } = useLoginApi();

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    setLoginError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleLoginSubmit = async () => {
    setUsernameError('');
    setPasswordError('');
    setLoginError('');

    let hasError = false;

    if (!username.trim()) {
      setUsernameError('아이디를 입력해 주세요');
      hasError = true;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해 주세요');
      hasError = true;
    }

    if (hasError) return;
    if (isLoading) return;

    // 1단계: 로그인 API 호출하여 토큰 획득
    const result = await loginUser({
      username: username,
      password: password,
    });

    if (result.success) {
      const token = result.data?.accessToken || result.data?.token;

      if (!token) {
        setLoginError('토큰을 받아오지 못했습니다.');
        return;
      }

      // 2단계: 획득한 토큰으로 즉시 사용자 정보(/auth/info) 조회 API 요청
      try {
        const response = await fetch('https://cofix.jongyeol.kr/auth/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        // 3단계: 사용자 정보 조회 성공 시 토큰, 닉네임, 아이디, 이메일 저장
        if (response.ok && data.nickname) {
          const currentUsername = data.username || username;
          const currentEmail = data.email || '';

          localStorage.setItem('token', token);
          localStorage.setItem('nickname', data.nickname);
          localStorage.setItem('username', currentUsername);
          localStorage.setItem('email', currentEmail); // 💡 이메일 로컬 스토리지 저장
          
          // 계정 관리 모달 호환용 userInfo 객체 저장
          localStorage.setItem('userInfo', JSON.stringify({
            username: currentUsername,
            nickname: data.nickname,
            email: currentEmail,
          }));

          // 사이드바에 닉네임 변경 신호 발송
          window.dispatchEvent(new Event('login-success'));

          if (onLoginSuccess) {
            onLoginSuccess(result.data);
          }

          resetForm();
          onClose();
        } else {
          setLoginError(data.message || '사용자 정보를 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('Info API Network Error:', err);
        setLoginError('네트워크 오류가 발생했습니다.');
      }
    } else {
      setLoginError(result.message || '아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLoginSubmit();
    }
  };

  return (
    <div 
      onClick={handleClose}
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 visible backdrop-blur-[0.18vh]' : 'opacity-0 invisible backdrop-blur-none pointer-events-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          backgroundImage: 'linear-gradient(135deg, rgba(27, 107, 244, 0.75), rgba(213, 1, 255, 0.75))' 
        }}
        className={`relative w-[39.37vw] max-w-[39.37vw] h-[68.7vh] max-h-[68.7vh] p-[2px] rounded-[1rem] shadow-[0_0_70px_rgba(150,50,255,0.6)] select-none transition-all duration-400 ease-out transform ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className={`w-full h-full bg-[#1F2937] border-white-5 border-2 rounded-[calc(1rem-2px)] flex items-center flex-col pt-[5vh] relative overflow-hidden transition-opacity duration-500 delay-100 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}>
          
          <button 
            onClick={handleClose}
            className="absolute top-[2.22vh] right-[1.66vw] text-gray400 hover:text-white text-[2.77vh] font-semibold cursor-pointer focus:outline-none transition-all z-10"
          >
            &times;
          </button>
          
          <div className="relative p-0 flex justify-center items-center">
            <div 
              style={{ backgroundImage: 'linear-gradient(135deg, #1B6BF4, #D501FF)' }}
              className="absolute w-[15vh] h-[15vh] rounded-full blur-[15px] opacity-50 pointer-events-none"
            ></div>
            <img 
              src={logo} 
              alt="로고" 
              className="relative w-[14.5vh] h-[14.5vh] max-h-[14.5vh] object-cover rounded-full shadow-lg flex justify-center items-center z-10 border border-white-5"
            />
          </div>

          <div className="text-white font-[800] text-[3.5vh] mt-[1.8vh]">
            로그인
          </div>

          <div className="text-gray400 font-semibold text-[1.5vh] mt-[0.6vh]">
            CoFix에 오신 것을 환영합니다.
          </div>
          
          {loginError && (
            <div className="text-red400 text-[1.2vh] font-semibold mt-[1.2vh]">
              {loginError}
            </div>
          )}

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[2.8vh] relative flex items-center">
            <input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameError) setUsernameError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="아이디를 입력하세요"
              className={`w-full h-[5.09vh] max-h-[5.09vh] bg-[#374151] border rounded-lg pl-[0.83vw] pr-[7.5vw] text-white placeholder-gray400 focus:outline-none transition-all text-[1.48vh] ${
                usernameError ? 'border-red400' : 'border-white-5'
              }`}
            />
            {usernameError && (
              <span className="absolute right-[1vw] text-red400 text-[1.1vh] font-semibold pointer-events-none">
                {usernameError}
              </span>
            )}
          </div>

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[1.6vh] relative flex items-center">
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="비밀번호를 입력하세요"
              className={`w-full h-[5.09vh] max-h-[5.09vh] bg-[#374151] border rounded-lg pl-[0.83vw] pr-[8vw] text-white placeholder-gray400 focus:outline-none transition-all text-[1.48vh] ${
                passwordError ? 'border-red400' : 'border-white-5'
              }`}
            />
            {passwordError && (
              <span className="absolute right-[1vw] text-red400 text-[1.1vh] font-semibold pointer-events-none">
                {passwordError}
              </span>
            )}
          </div>

          <div className="w-[29.79vw] max-w-[29.79vw] mt-[3vh]">
            <button 
              type="button"
              onClick={handleLoginSubmit}
              disabled={isLoading}
              style={{ backgroundImage: 'linear-gradient(to right, #1B6BF4, #D501FF)' }}
              className="w-full h-[7vh] max-h-[7vh] border-white-5 border rounded-4xl cursor-pointer text-white flex justify-center items-center text-[2.05vh] font-bold opacity-90 hover:opacity-100 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </div>

          <div className="text-gray200 w-fit text-center mt-[4vh] text-[1.5vh]">
            <span>계정이 없으신가요? </span>
            <button
              type="button"
              onClick={onSignUpClick} 
              className="text-sky-400 text-[1.5vh] underline cursor-pointer focus:outline-none ml-[0.1vw]"
            >
              회원가입
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;