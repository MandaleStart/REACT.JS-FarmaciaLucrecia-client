import React, { useState } from 'react';
import Logo from './Logo/Logo';
import './navbar.css';
import Categories from './Categories/Categories';
import UserControl from './UserControl/UserControl';
import CartWidget from './CartWidget/CartWidget';
import FavoriteWidget from './FavoriteWidget/FavoriteWidget';
import { addToCart, addToFav } from '@utils/utils';


const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [favoriteItemsCount, setFavoriteItemsCount] = useState(0);

  const handleAddToCart = (id) => {
    addToCart({ id }, setCartItemsCount);
  };

  const handleAddToFav = (id) => {
    addToFav({ id }, setFavoriteItemsCount);
  };

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