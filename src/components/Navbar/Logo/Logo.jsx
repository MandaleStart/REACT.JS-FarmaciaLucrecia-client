import { Link } from 'react-router-dom';
const Logo = () => {
    return (
      <Link to="/" className="logo text-reset no-a font-logo">
        Farmacia
        <img src="https://i.ibb.co/MkP0dd0/logo.png" alt="logo" className="img-logo" />
        LUCRECIA
      </Link>
    );
  };
  
  export default Logo;