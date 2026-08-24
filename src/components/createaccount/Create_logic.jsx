import { useState } from 'react';
import { useRegisterApi } from '../../hooks/RegisterApi';
import { useLoginApi } from '../../hooks/LoginApi'; 

// 환경 변수에서 API 베이스 URL을 가져옴
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function Create_logic({ onClose1, onSignUpComplete }) {
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

  // 회원가입과 로그인 API 훅을 둘 다 가져옴
  const { registerUser, isLoading: isRegisterLoading } = useRegisterApi();
  const { loginUser, isLoading: isLoginLoading } = useLoginApi();

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
    // 회원가입 혹은 자동 로그인 진행 중일 때는 중복 요청 방지
    if (!isFormValid || isRegisterLoading || isLoginLoading) return;

    resetErrors();

    const fullEmail = `${emailPrefix.trim()}@${emailDomain}`;

    const result = await registerUser({
      username: username,
      password: password,
      nickname: name,
      email: fullEmail,
    });

    if (result.success) {
      try {
        const loginResult = await loginUser({ 
          username: username, 
          password: password 
        });
        
        if (loginResult.success && loginResult.data) {
          const token = loginResult.data.token || loginResult.data.accessToken; 
          
          if (token) {
            // 토큰 저장
            localStorage.setItem('token', token);
            
            // 입력했던 이름(name)을 닉네임으로 로컬 스토리지에 저장
            localStorage.setItem('nickname', name);
            
            // SideNav가 눈치채고 닉네임을 바로 바꾸도록 이벤트(신호) 발송
            window.dispatchEvent(new Event('login-success'));
            
            console.log("토큰 및 닉네임 저장 완료!");
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

  const handleGoogleLogin = () => {
    if (window.confirm('외부 페이지로 이동하시겠습니까?')) {
      // 하드코딩된 주소 대신 환경 변수 사용
      window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
    }
  };

  const handleGithubLogin = () => {
    if (window.confirm('외부 페이지로 이동하시겠습니까?')) {
      // 하드코딩된 주소 대신 환경 변수 사용
      window.location.href = `${API_BASE_URL}/oauth2/authorization/github`;
    }
  };

  return {
    username,
    setUsername,
    name,
    setName,
    emailPrefix,
    setEmailPrefix,
    emailDomain,
    setEmailDomain,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    usernameError,
    setUsernameError,
    emailError,
    setEmailError,
    generalError,
    setGeneralError,
    isLoading: isRegisterLoading || isLoginLoading, 
    isPasswordMismatched,
    isFormValid,
    handleClose,
    handleSignUpSubmit,
    handleKeyDown,
    handleGoogleLogin,
    handleGithubLogin,
  };
}