/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { db } from '../../firedb';
import { useEffect, useState } from 'react';

const userID = localStorage.getItem('user');

const userDocRef = db.collection('usuarios').doc(userID);
const user = userID

export const addToDoc = (collection, id) => {
  userDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const collectionArray = data[collection] || [];
        if (!collectionArray.includes(id)) {
          collectionArray.push(id);
          return userDocRef.update({ [collection]: collectionArray });
        }
        console.log(`El producto se agregó a ${collection}`, { id });
      } else {
        console.log("El documento no existe.");
      }
    })
    .catch((error) => {
      console.error(`Error al actualizar el campo ${collection}:`, error);
    });
};

export const addToFav = ({ id }) => {
  if (user == null || user == 'unlogged') { alert('Debe iniciar sesion para agregar a Favoritos') } else { addToDoc("fav", id); }
};

export const addToCart = ({ id }) => {
  if (user == null || user == 'unlogged') { alert('Debe iniciar sesion para agregar al carrito') } else { addToDoc("cart", id) }
};
/*
export const ItemsCount = (collection) => {
  const [itemsCount, setItemsCount] = useState(0);
  useEffect(() => {
    if (userID) {
      db.collection('usuarios').doc(userID).get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const collectionArray = data[collection] || [];
          setItemsCount(collectionArray.length);
        } else {
          setItemsCount(0);
        }
      })
        .catch((error) => {
          console.error('Error al obtener datos del usuario:', error);
          setItemsCount(0);
        });
    } else { setItemsCount(0); }
  }, [collection]);
  return itemsCount;
};*/