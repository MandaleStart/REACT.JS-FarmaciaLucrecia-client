import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartWidget = ({ cartItemsCount }) => {
  return (
    <Link className="cart-widget text-reset alert alert-success" to="/carrito">
      <FaCartPlus />
      <span className="cart-count">{cartItemsCount}</span>
    </Link>
  );
};

export default CartWidget;
