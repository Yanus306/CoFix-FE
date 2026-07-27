export const mockCodeData = {
  id: 1,
  codeMarkdown: `\`\`\`javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
\`\`\``,
};

export const mockCodeData2 = {
  id: 2,
  codeMarkdown: "",
};

export const mockCodeList = [mockCodeData, mockCodeData2];