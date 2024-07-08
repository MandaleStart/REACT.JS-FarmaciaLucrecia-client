import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { userID } from '../../../../utils/session';
import { useEffect, useState } from 'react';
import { db } from '../../../../../firedb';

// eslint-disable-next-line react/prop-types
const CartWidget = () => {
  
    const [cartItemsCount, setCartItemsCount] = useState(0);
    
      useEffect(() => {
        if (userID) {
          db.collection('usuarios').doc(userID).get()
            .then((doc) => {
              if (doc.exists) {
                const cartArray = doc.data().cart;
                setCartItemsCount(cartArray.length);
              } else {
                setCartItemsCount(0);
              }
            })
            .catch((error) => {
              console.error('Error al obtener datos del usuario:', error);
              setCartItemsCount(0);
            });
        } else {
          setCartItemsCount(0);
        }
      }, [userID]);
    
  return (
    <Link className="cart-widget text-reset alert alert-success" to="/carrito">
      <FaCartPlus />
      <span className="cart-count">{cartItemsCount}</span>
    </Link>
  );
};

export default CartWidget;
