import { FaMailBulk,FaPhone,FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Contact = () => {
  return (
    <div>
      <h3>Contacto</h3>
      <ul className="list-unstyled ">
        <li><Link className="no-a text-reset" to="tel:+598 4447 4952"><FaPhone />Telefono: 4447 4952 </Link>
        </li>
        <li><Link className="no-a text-reset" to="https://api.whatsapp.com/send/?phone=59898149089" target="_blank" rel='noreferrer'><FaWhatsapp />Whatsapp: 098 149 089</Link>
        </li>
        <li><Link className="no-a text-reset" to="../contacto"><FaMailBulk />contacto@farmacialucrecia.com</Link>
        </li>
      </ul>
    </div>
  );
};

export default Contact;