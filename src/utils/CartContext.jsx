import React, { createContext, useState } from 'react';

export const CountContext = createContext();

const CartContext = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [favoriteItemsCount, setFavoriteItemsCount] = useState(0);

  return (
    <CountContext.Provider value={{ cartItemsCount, setCartItemsCount, favoriteItemsCount, setFavoriteItemsCount }}>
      {children}
    </CountContext.Provider>
  );
};

export default CartContext;
