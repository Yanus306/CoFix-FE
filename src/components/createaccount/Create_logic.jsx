import { useState } from 'react';
import { useRegisterApi } from '../../hooks/RegisterApi';
import { useLoginApi } from '../../hooks/LoginApi'; 

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
      // 회원가입 성공 시 곧바로 로그인(토큰 발급) 진행
      try {
        const loginResult = await loginUser({ 
          username: username, 
          password: password 
        });
        
        // 백엔드 로그인 API 응답에 토큰이 포함되어 있다면 localStorage에 저장
        if (loginResult.success && loginResult.token) {
          localStorage.setItem('token', loginResult.token);
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
      window.location.href = 'http://cofix.jongyeol.kr/oauth2/authorization/google';
    }
  };

  const handleGithubLogin = () => {
    if (window.confirm('외부 페이지로 이동하시겠습니까?')) {
      window.location.href = 'http://cofix.jongyeol.kr/oauth2/authorization/github';
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