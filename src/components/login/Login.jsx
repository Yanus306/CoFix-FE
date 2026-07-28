import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useLoginApi } from '../../hooks/LoginApi';

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

  // 로그인 처리 함수 (백엔드 API 연동)
  const handleLoginSubmit = async () => {
    setLoginError('');

    if (!username.trim() || !password) {
      setLoginError('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }

    if (isLoading) return;

    const result = await loginUser({
      username: username,
      password: password,
    });

    if (result.success) {
      if (result.data?.accessToken || result.data?.token) {
        localStorage.setItem('token', result.data.accessToken || result.data.token);
      }
      if (result.data?.user) {
        localStorage.setItem('userInfo', JSON.stringify(result.data.user));
      }

      if (onLoginSuccess) {
        onLoginSuccess(result.data);
      }

      resetForm();
      onClose();
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
        isOpen ? 'opacity-100 visible backdrop-blur-[0.18vh]' : 'opacity-0 invisible backdrop-blur-none'
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[39vw] min-w-[16.66vw] max-w-[39.06vw] h-[80vh] min-h-[46.3vh] max-h-[72.22vh] bg-gray700 border-white-5 border-2 rounded-md flex justify-center items-center flex-col gap-[1.48vh] bg-center shadow-2xl select-none transition-all duration-500 ease-out ${
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
        
        <div className="p-[2.4vh]">
          <img 
            src={logo} 
            alt="로고" 
            className="w-full h-[18vh] max-h-[16.66vh] object-cover rounded-full shadow-lg flex justify-center items-center"
          />
        </div>
        
        {/* 아이디 라벨 및 에러 메시지 */}
        <div className="text-gray200 w-full text-left px-[4.16vw] mt-[1.85vh] font-bold text-[1.85vh] flex justify-between items-center">
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

        {/* 비밀번호 라벨 */}
        <div className="text-gray200 w-full text-left px-[4.16vw] mt-[1.85vh] font-bold text-[1.85vh]">비밀번호</div>
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
          className="w-[15vw] max-w-[15.1vw] h-[8vh] max-h-[7.4vh] bg-gray800-50 border-white-5 border rounded-4xl cursor-pointer text-purple400 flex justify-center items-center text-[3.24vh] mt-[3.7vh] font-bold hover:bg-gray700 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>

        <div className="text-gray200 w-fit text-center mt-[1.85vh] text-[1.2vh]">
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