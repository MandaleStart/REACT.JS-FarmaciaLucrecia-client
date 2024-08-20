import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDoorOpen } from 'react-icons/fa/index.esm';
import { closeSession, userID } from '@utils/session';
import { getUserIDN } from '@utils/utils';

const UserControl = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = await getUserIDN();
      setUsername(user);
    };

    fetchUsername();
  }, []);

  const onCloseSession = () => {
    closeSession();
    navigate('/iniciar-sesion');
  };

  if (userID == null || userID === 'unlogged') {
    return (
      <>
        <Link to='/iniciar-sesion' className='btn btn-success' type="button">
          Iniciar Sesión
        </Link>
        <Link to='/registro' className='btn btn-dark' type="button">
          Registrarse
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link className='no-a btn btn-' to='/usuario'>
          {username || 'Cargando...'}
        </Link>
        <button className='btn btn-danger' onClick={onCloseSession}>
          <FaDoorOpen />
        </button>
      </>
    );
  }
};

export default UserControl;
