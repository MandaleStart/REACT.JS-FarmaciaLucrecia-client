import React, { useState } from 'react';
import Logo from './Logo/Logo';
import './navbar.css';
import Categories from './Categories/Categories';
import UserControl from './UserControl/UserControl';
import CartWidget from './CartWidget/CartWidget';
import FavoriteWidget from './FavoriteWidget/FavoriteWidget';

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const cartItemsCount = 10;
  const favoriteItemsCount = 5;

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