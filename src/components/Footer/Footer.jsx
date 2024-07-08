import SocialNetworks from './SocialNetworks/SocialNetworks';
import Schedule from './Schedule/Schedule';
import Address from './Address/Address';
import Contact from './Contact/Contact';
import Information from './Information/Information';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark mt-auto text-white py-4">
      <div className="container">
        <div className="row row-order-1">
          <div className="col-md-3">
            <SocialNetworks className="col" />
          </div>
          <div className="col-md-3">
            <Schedule className="col" />
          </div>
          <div className="col-md-3">
            <Address className="col" />
          </div>
          <div className="col-md-3">
            <Contact />
          </div>
        </div>
        <div className="row-order-2">
          <Information className="no-a"/>
        </div>

      </div>
    </footer>
  );
};

export default Footer;