import React, { useContext, useEffect } from 'react';
import Logo from './Logo/Logo';
import './navbar.css';
import Categories from './Categories/Categories';
import UserControl from './UserControl/UserControl';
import CartWidget from './CartWidget/CartWidget';
import FavoriteWidget from './FavoriteWidget/FavoriteWidget';
import { fetchCount, userID } from '@utils/utils';
import { CountContext } from '@utils/CartContext'; 

const Navbar = () => {
  const { cartItemsCount, setCartItemsCount, favoriteItemsCount, setFavoriteItemsCount } = useContext(CountContext);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const user = userID; 
        if (user) {
          const cartCount = await fetchCount(user, 'cart');
          const favCount = await fetchCount(user, 'fav');
          setCartItemsCount(cartCount);
          setFavoriteItemsCount(favCount);
        } else {
          console.error("No se pudo obtener el ID del usuario.");
        }
      } catch (error) {
        console.error("Error al cargar los conteos:", error);
      }
    };

    loadCounts();
  }, [setCartItemsCount, setFavoriteItemsCount]);

  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <div className="container">
        <Logo className='col-4' />
        <div className='col-4'>
          <CartWidget cartItemsCount={cartItemsCount} />
          <FavoriteWidget favoriteItemsCount={favoriteItemsCount} />
          <UserControl />
        </div>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;