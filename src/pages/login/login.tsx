import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';

import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import { loginUserThunk } from '../../services/slices/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }))
      .unwrap()
      .then((response) => {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        navigate('/profile');
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
