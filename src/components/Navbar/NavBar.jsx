import React, { useState, useEffect } from 'react';
import Logo from './Logo/Logo';
import './navbar.css';
import Categories from './Categories/Categories';
import UserControl from './UserControl/UserControl';
import CartWidget from './CartWidget/CartWidget';
import FavoriteWidget from './FavoriteWidget/FavoriteWidget';
import { fetchCount , userID } from '@utils/utils'; // Asegúrate de exportar fetchCount desde utils

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [favoriteItemsCount, setFavoriteItemsCount] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const user = userID; // Asegúrate de tener el ID del usuario
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
  }, []);

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
