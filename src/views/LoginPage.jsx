/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onResetPassword, onLoginSession, onSignin } from '@utils/session';

const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    onLoginSession(mail, password, navigate);
  };

  const handleResetPassword = () => {
    onResetPassword(mail);
  };

  const handleSignin = () => {
    onSignin(navigate);
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
          <button type="button" className="btn btn-success btn-block w-100" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
        <div className="mx-4 mt-1">
          <button type="button" className="btn btn-warning btn-block w-100" onClick={handleResetPassword}>
            Olvidé mi contraseña
          </button>
        </div>
        <div className="mx-4 mt-1">
          <button type="button" className="btn btn-primary btn-block" onClick={handleSignin}>
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
