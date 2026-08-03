import { useState } from 'react';
import { useRegisterApi } from '../../hooks/RegisterApi';

export function useCreateAccountLogic(onClose1, onSignUpComplete) {
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
    formState: {
      username,
      name,
      emailPrefix,
      emailDomain,
      password,
      confirmPassword,
    },
    errorState: {
      usernameError,
      emailError,
      generalError,
    },
    setters: {
      setUsername: (val) => {
        setUsername(val);
        if (usernameError) setUsernameError('');
        if (generalError) setGeneralError('');
      },
      setName,
      setEmailPrefix: (val) => {
        setEmailPrefix(val);
        if (emailError) setEmailError('');
        if (generalError) setGeneralError('');
      },
      setEmailDomain,
      setPassword,
      setConfirmPassword,
    },
    validation: {
      isPasswordMismatched,
      isFormValid,
      isLoading,
    },
    handlers: {
      handleClose,
      handleSignUpSubmit,
      handleKeyDown,
      handleGoogleLogin,
      handleGithubLogin,
    },
  };
}