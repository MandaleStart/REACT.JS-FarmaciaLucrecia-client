/* eslint-disable react-refresh/only-export-components */
import { db } from './firedb';

export const userID = localStorage.getItem('user');
export const userDocRef = db.collection('usuarios').doc(userID);

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
            if (callback) callback(collectionArray.length); 
          });
        }
      } else {
        //console.log("El documento no existe.");
      }
    })
    .catch((error) => {
     // console.error(`Error al actualizar el campo ${collection}:`, error);
    });
};

export const addToFav = (product,updateFavoriteCount) => {
  if (userID === null || userID === 'unlogged') {
    swal('Debe iniciar sesión para agregar a Favoritos' , 'error');
  } else {
    updateProductQuantity("fav", product.id, 1, updateFavoriteCount);
  }
};

export const addToCart = (product, cant,updateCartCount) => {
  if (userID === null || userID === 'unlogged') {
    swal('Debe iniciar sesión para agregar al carrito', 'error');
  } else {
    updateProductQuantity("cart", product.id, cant, updateCartCount);
  }
};

export const getUserIDN = async () => {
  const userID = localStorage.getItem('user');
  
  if (userID === null || userID === 'unlogged') {
    return null;  
  }

  try {
    const userDocRef = db.collection('usuarios').doc(userID);
    const doc = await userDocRef.get();

    if (doc.exists) {
      const data = doc.data();
      return data.username || null;  
    } else {
     // console.log('El documento no existe.');
      return null;
    }
  } catch (error) {
   //console.error('Error al obtener el username:', error);
    return null;
  }
};

export const updateProductQuantity = (collection, id, incrementBy = 1, callback) => {
  if (!userDocRef) {
    //console.error('No se ha encontrado el usuario.');
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
            if (callback) callback(collectionArray.length); 
          });
      } else {
        console.log("El documento no existe.");
      }
    })
    .catch((error) => {
    //  console.error(`Error al actualizar el campo ${collection}:`, error);
    });
};

export const fetchCartData = async (user) => {
  try {
    const usuarioRef = db.collection('usuarios').doc(user);
    const usuarioSnapshot = await usuarioRef.get();

    // Asegura que el campo 'cart' existe y es un array
    const cartItems = usuarioSnapshot.get('cart') || [];

    // Verifica si 'cartItems' es realmente un array
    if (!Array.isArray(cartItems)) {
     // console.error('El campo cart no es un array.');
      return [];
    }
    return cartItems;
    
  } catch (error) {
   // console.error('Error al obtener los datos del carrito:', error);
    return [];
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

    } else {
   //   console.log('El documento del usuario no existe.');
    }
  } catch (error) {
   // console.error('Error al actualizar la cantidad en el carrito:', error);
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
    //  console.log('Elemento eliminado del carrito.');
    } else {
      //console.log('El documento del usuario no existe.');
    }
  } catch (error) {
    //console.error('Error al eliminar el elemento del carrito:', error);
    throw error;
  }
};

export const fetchCount = async (user, field) => {
  try {
    // Verifica que el campo sea 'cart' o 'fav'
    if (!['cart', 'fav'].includes(field)) {
      return 0;
    }

    const usuarioRef = db.collection('usuarios').doc(user);
    const usuarioSnapshot = await usuarioRef.get();

    const items = usuarioSnapshot.get(field) || [];

    // Verifica si 'items' es realmente un array
    if (!Array.isArray(items)) {
      //console.error(`El campo ${field} no es un array.`);
      return 0;
    }

    // Cuenta el número total de productos
    const count = items.length;
    return count;

  } catch (error) {
    //console.error('Error al obtener el conteo de productos:', error);
    return 0;
  }
};

export const clearCart = async (userID) => {
  try {
    //console.log(userID)
    const userDocRef = db.collection('usuarios').doc(userID);
    //console.log(userDocRef)
    await userDocRef.update({ cart: [] }); // Vacía el carrito
  } catch (error) {
    //console.error('Error al limpiar el carrito en Firebase:', error);
  }
};