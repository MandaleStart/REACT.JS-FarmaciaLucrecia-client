import React, { createContext, useState, useEffect } from 'react';
import { userID, loginSession, closeSession } from '@utils/session'; 

export const CountContext = createContext();

const CartContext = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [favoriteItemsCount, setFavoriteItemsCount] = useState(0);
  const [user, setUser] = useState(null); // Estado para el usuario
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    //sesión desde localStorage
    const currentUser = localStorage.getItem('user');
    setUser(currentUser !== 'unlogged' ? currentUser : null);
    setLoading(false); // Finalizar la carga

    // Escuchar cambios en la sesión
    const handleSessionUpdate = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser !== 'unlogged' ? updatedUser : null);
    };

    window.addEventListener('sessionUpdated', handleSessionUpdate);

    return () => {
      window.removeEventListener('sessionUpdated', handleSessionUpdate);
    };
  }, []);

  return (
    <CountContext.Provider value={{
      cartItemsCount,
      setCartItemsCount,
      favoriteItemsCount,
      setFavoriteItemsCount,
      user,
      loginSession,
      closeSession,
      loading
    }}>
      {children}
    </CountContext.Provider>
  );
};

export default CartContext;
