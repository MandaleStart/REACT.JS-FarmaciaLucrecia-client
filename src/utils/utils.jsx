/* eslint-disable react-refresh/only-export-components */
import { db } from './firedb';

const userID = localStorage.getItem('user');
const userDocRef = db.collection('usuarios').doc(userID);

export const addToDoc = (collection, id, callback) => {
  userDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const collectionArray = data[collection] || [];
        if (!collectionArray.includes(id)) {
          collectionArray.push(id);
          userDocRef.update({ [collection]: collectionArray }).then(() => {
            if (callback) callback(collectionArray.length); // Actualiza el contador
          });
        }
      } else {
        console.log("El documento no existe.");
      }
    })
    .catch((error) => {
      console.error(`Error al actualizar el campo ${collection}:`, error);
    });
};

export const addToFav = (product, updateFavoriteCount) => {
  if (userID === null || userID === 'unlogged') {
    alert('Debe iniciar sesión para agregar a Favoritos');
  } else {
    updateProductQuantity("fav", product.id, 1, updateFavoriteCount);
  }
};

export const addToCart = (product, updateCartCount) => {
  if (userID === null || userID === 'unlogged') {
    alert('Debe iniciar sesión para agregar al carrito');
  } else {
    updateProductQuantity("cart", product.id, 1, updateCartCount);
  }
};

export const getUserIDN = async () => {
  const userID = localStorage.getItem('user');
  
  if (userID === null || userID === 'unlogged') {
    return null;  // Retorna null si el usuario no está logueado
  }

  try {
    const userDocRef = db.collection('usuarios').doc(userID);
    const doc = await userDocRef.get();

    if (doc.exists) {
      const data = doc.data();
      return data.username || null;  // Retorna el username si existe
    } else {
      console.log('El documento no existe.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el username:', error);
    return null;
  }
};

export const updateProductQuantity = (collection, id, incrementBy = 1, callback) => {
  if (!userDocRef) {
    console.error('No se ha encontrado el usuario.');
    return;
  }

  userDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        let collectionArray = data[collection] || [];

        // Encuentra el índice del producto en el array
        const productIndex = collectionArray.findIndex(product => product.id === id);

        if (productIndex > -1) {
          // Producto encontrado, actualiza la cantidad
          collectionArray[productIndex].cant += incrementBy;
        } else {
          // Producto no encontrdo
          collectionArray.push({ id, cant: incrementBy });
        }
        
        // Actualiza el documento en la base de datos
        userDocRef.update({ [collection]: collectionArray })
          .then(() => {
            if (callback) callback(collectionArray.length); // Llama al callback con la longitud del array actualizado
          });
      } else {
        console.log("El documento no existe.");
      }
    })
    .catch((error) => {
      console.error(`Error al actualizar el campo ${collection}:`, error);
    });
};

export const fetchCartData = async (user) => {
  try {
    const usuarioRef = db.collection('usuarios').doc(user);
    const usuarioSnapshot = await usuarioRef.get();
    const cartIds = usuarioSnapshot.get('cart');
    const productosRef = db.collection('products');
    const productosData = [];

    for (const cartId of cartIds) {
      const productoQuerySnapshot = await productosRef.where('id', '==', cartId).get();
      const productoDoc = productoQuerySnapshot.docs[0];
      if (productoDoc) {
        productosData.push(productoDoc.data());
      }
    }

    return productosData;
  } catch (error) {
    console.error('Error al obtener los datos del carrito:', error);
    throw error;
  }
};

export const updateCartQuantity = async (user, id, quantity) => {
  try {
    const userRef = db.collection('usuarios').doc(user);
    const doc = await userRef.get();
    if (doc.exists) {
      const cartArray = doc.data().cart;
      const productIndex = cartArray.findIndex(item => item.id === id);
      if (productIndex > -1) {
        cartArray[productIndex].cant = quantity;
      } else {
        cartArray.push({ id, cant: quantity });
      }
      await userRef.update({ cart: cartArray });
      console.log('Cantidad actualizada en el carrito.');
    } else {
      console.log('El documento del usuario no existe.');
    }
  } catch (error) {
    console.error('Error al actualizar la cantidad en el carrito:', error);
    throw error;
  }
};

export const removeFromCart = async (user, id) => {
  try {
    const userRef = db.collection('usuarios').doc(user);
    const doc = await userRef.get();
    if (doc.exists) {
      const cartArray = doc.data().cart;
      const updatedCartArray = cartArray.filter(item => item.id !== id);
      await userRef.update({ cart: updatedCartArray });
      console.log('Elemento eliminado del carrito.');
    } else {
      console.log('El documento del usuario no existe.');
    }
  } catch (error) {
    console.error('Error al eliminar el elemento del carrito:', error);
    throw error;
  }
};