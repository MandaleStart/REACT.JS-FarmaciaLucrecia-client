import { FaFacebook,FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialNetworks = () => {
  return (
    <div>
      <h3>Redes Sociales</h3>
      <ul className='list-unstyled '>
        <li>
          <Link to="https://www.instagram.com/lucreciafarmacia/" className="no-a me-4 text-reset" target="_blank" rel='noreferrer'>
            <FaInstagram />Lucreciafarmacia
          </Link>
        </li>
        <li>
          <Link to="https://www.facebook.com/profile.php?id=100010059819004" className="no-a me-4 text-reset" target="_blank" rel='noreferrer'>
            <FaFacebook /> Farmacia Lucrecia
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialNetworks;