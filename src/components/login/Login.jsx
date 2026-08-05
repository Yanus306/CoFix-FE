import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useLoginApi } from '../../hooks/LoginApi';
import gitlogo from '../../assets/gitlogo.png';
import googlelogo from '../../assets/googlelogo.png';

function Login({ isOpen, onClose, onSignUpClick, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { loginUser, isLoading } = useLoginApi();

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleLoginSubmit = async () => {
    setLoginError('');

    if (!username.trim() || !password) {
      setLoginError('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

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

      // 💡 2단계: 획득한 토큰으로 즉시 사용자 정보(/auth/info) 조회 API 요청
      try {
        const response = await fetch('https://cofix.jongyeol.kr/auth/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        // 💡 3단계: 사용자 정보 조회가 '성공'했을 때만 토큰과 닉네임을 저장!
        if (response.ok && data.nickname) {
          localStorage.setItem('token', token);
          localStorage.setItem('nickname', data.nickname);
          
          if (data.user) {
            localStorage.setItem('userInfo', JSON.stringify(data.user));
          }

          // 사이드바에 닉네임 변경 신호 발송
          window.dispatchEvent(new Event('login-success'));

          // 성공적으로 메인 화면으로 이동 (부모 컴포넌트의 성공 함수 호출)
          if (onLoginSuccess) {
            onLoginSuccess(result.data);
          }

          resetForm();
          onClose();
        } else {
          // 정보 조회 실패 시
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
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'opacity-100 visible backdrop-blur-[0.18vh]' : 'opacity-100 invisible backdrop-blur-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[39vw] min-w-[16.66vw] max-w-[39.06vw] h-[80vh] min-h-[46.3vh] max-h-[72.22vh] bg-gray700 border-white-5 border-2 rounded-md flex justify-center items-center flex-col gap-[1.2vh] bg-center shadow-2xl select-none transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <button 
          onClick={handleClose}
          className="absolute top-[2.22vh] right-[1.66vw] text-gray400 hover:text-white text-[2.77vh] font-semibold cursor-pointer focus:outline-none transition-all"
        >
          &times;
        </button>
        
        <div className="p-0">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[16vh] max-h-[15vh] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>
        
        <div className="text-gray200 w-full text-left px-[4.16vw] font-bold text-[1.85vh] flex justify-between items-center mt-[1.2vh]">
          <span>아이디</span>
          {loginError && (
            <span className="text-red400 text-[1.29vh] font-semibold">
              {loginError}
            </span>
          )}
        </div>
        <input 
          type="text" 
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (loginError) setLoginError('');
          }}
          onKeyDown={handleKeyDown}
          className={`hover:bg-gray700 w-[30vw] max-w-[29.68vw] h-[5vh] max-h-[4.63vh] bg-gray800-50 border rounded-lg cursor-pointer pl-[0.83vw] text-white focus:outline-none transition-all text-[1.66vh] ${
            loginError ? 'border-red400' : 'border-white-5'
          }`}
        />

        <div className="text-gray200 w-full text-left px-[4.16vw] mt-[1.2vh] font-bold text-[1.85vh] ">비밀번호</div>
        <input 
          type="password" 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (loginError) setLoginError('');
          }}
          onKeyDown={handleKeyDown}
          className={`hover:bg-gray700 w-[30vw] max-w-[29.68vw] h-[5vh] max-h-[4.63vh] bg-gray800-50 border rounded-lg cursor-pointer pl-[0.83vw] text-white focus:outline-none transition-all text-[1.66vh] ${
            loginError ? 'border-red400' : 'border-white-5'
          }`}
        />

        <button 
          onClick={handleLoginSubmit}
          disabled={isLoading}
          className="w-[15vw] max-w-[15vw] py-[0.6vh] bg-gray800-50 border-white-5 border rounded-2xl cursor-pointer text-purple400 flex justify-center items-center text-[3.24vh] mt-[2vh] font-bold hover:bg-gray700 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>

        {/* 💡 로그인 버튼 아래 양옆 구분선 및 '또는' 텍스트 (단위 통일 완료) */}
        <div className="w-[30vw] max-w-[29.68vw] flex items-center my-[2.2vh]">
          <div className="grow border-t border-gray600"></div>
          <span className="text-gray200 text-[1.2vh] px-[1vw]">또는</span>
          <div className="grow border-t border-gray600"></div>
        </div>

        {/* 💡 소셜 로그인 버튼 영역 (왼쪽 구글, 오른쪽 깃허브) */}
        <div className="w-[30vw] max-w-[29.68vw] flex justify-center gap-[1.5vw]">
          <button 
            type="button"
            className="w-[5vh] h-[5vh] max-h-[4.63vh] bg-gray800-50 border border-white-5 rounded-full flex justify-center items-center hover:bg-gray700 transition-all cursor-pointer focus:outline-none shadow-md"
          >
            <img src={googlelogo} alt="구글 로그인" className="w-[2.2vh] h-[2.2vh] object-contain" />
          </button>
          <button 
            type="button"
            className="w-[5vh] h-[5vh] max-h-[4.63vh] bg-gray800-50 border border-white-5 rounded-full flex justify-center items-center hover:bg-gray700 transition-all cursor-pointer focus:outline-none shadow-md"
          >
            <img src={gitlogo} alt="깃허브 로그인" className="w-[2.2vh] h-[2.2vh] object-contain" />
          </button>
        </div>

        <div className="text-gray200 w-fit text-center mt-[2vh] text-[1.2vh]">
          <span>계정이 없으신가요? </span>
          <button
            onClick={onSignUpClick} 
            className="text-purple400 text-[1.2vh] underline cursor-pointer focus:outline-none"
          >
            회원가입
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;