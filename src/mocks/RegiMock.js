// src/components/createaccount/RegiMock.js

export const checkIsMockRegister = ({ username, name, emailPrefix, password, confirmPassword }) => {
  return (
    username.trim() === '1' &&
    name.trim() === '1' &&
    emailPrefix.trim() === '1' &&
    password === '1' &&
    confirmPassword === '1'
  );
};