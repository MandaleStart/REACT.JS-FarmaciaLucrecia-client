/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { resetPassword, loginSession } from '@utils/session'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginSession = () => {
    loginSession(mail, password)
    navigate('/');
  };
  const onSignin = () => {
    navigate('/registro')
  }
  const onResetPassword = () => {
    resetPassword(mail)
  };
  return (
    <main className="d-flex justify-content-center align-items-center vh-40">
      <div className="border wb p-4">
        <div>
          <h5 className="login-title">Iniciar Sesión</h5>
        </div>
        <div className="mb-3">
          Mail:
          <input
            id="user-login-input"
            className="form-control"
            type="text"
            placeholder="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          Contraseña:
          <input
            id="pass-login-input"
            className="form-control"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      <div className="mx-4 mt-1">
          <button type="button" className="btn btn-success btn-block w-100" onClick={onLoginSession}>
            Iniciar Sesión
          </button>
      </div>
      <div className="mx-4 mt-1">
          <button type="button" className="btn btn-warning btn-block w-100" onClick={onResetPassword} >
            Olvidé mi contraseña
          </button>
      </div>
      <div className="mx-4 mt-1">
          <button type="button" className="btn btn-primary btn-block " onClick={onSignin} >No tienes cuenta? Registrate</button></div>
      </div>
    </main >
  );
};

export default LoginPage;
