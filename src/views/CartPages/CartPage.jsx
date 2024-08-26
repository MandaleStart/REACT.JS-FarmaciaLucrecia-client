import React, { useEffect, useState, useContext } from 'react';
import { CartSendOptions, CartBuyOptions, CartList } from './CartSettings/CartOptions';
import { fetchCartData } from '@utils/utils';
import { userID } from '@utils/session';
import { db } from '@utils/firedb';
import { CountContext } from '@utils/CountProvider'; // Importa el contexto

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [sendOptions, setSendOptions] = useState(null);
  const { setCartItemsCount } = useContext(CountContext);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const user = userID;
        if (user) {
          const fetchedItems = await fetchCartData(user);
          setItems(fetchedItems);
        } else {
          console.error("No se pudo obtener el ID del usuario.");
        }
      } catch (error) {
        console.error("Error al cargar los productos del carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await db.collection('products').get();
        const listaProductos = snapshot.docs.map((doc) => ({
          id: doc.data().id,
          name: doc.data().name,
          cost: doc.data().cost
        }));
        setProductos(listaProductos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    loadProducts();
  }, []);

  const updateFirebaseCart = async (userId, updatedItems) => {
    try {
      const userDocRef = db.collection('usuarios').doc(userId);
      await userDocRef.update({ cart: updatedItems });
    } catch (error) {
      console.error('Error al actualizar el carrito en Firebase:', error);
    }
  };

  const handleAdd = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, cant: item.cant + 1 } : item
    );
    setItems(updatedItems);
    setCartItemsCount(prevCount => prevCount + 1); // Actualiza el contador del carrito

    updateFirebaseCart(userID, updatedItems); // Actualiza Firebase
  };

  const handleRemove = (id) => {
    const updatedItems = items.map(item =>
      item.id === id && item.cant > 1
        ? { ...item, cant: item.cant - 1 }
        : item
    );
    setItems(updatedItems);
    setCartItemsCount(prevCount => prevCount - 1); // Actualiza el contador del carrito

    updateFirebaseCart(userID, updatedItems); // Actualiza Firebase
  };

  const handleDelete = (id) => {
    const itemToDelete = items.find(item => item.id === id);
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setCartItemsCount(prevCount => prevCount - itemToDelete.cant); // Ajusta el contador del carrito

    updateFirebaseCart(userID, updatedItems); // Actualiza Firebase
  };

  const combinedItems = items.map(item => {
    const product = productos.find(prod => prod.id === item.id);
    
    if (product) {
      return {
        id: item.id,
        cant: item.cant,
        name: product.name,
        cost: product.cost
      };
    }
    return {
      id: item.id,
      cant: item.cant,
      name: 'Desconocido',
      cost: 0
    };
  });

  const totalCost = combinedItems.reduce((acc, item) => {
    return acc + (item.cost || 0) * (item.cant || 0);
  }, 0);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="container row d-flex justify-content-between">
      <h1 className="mb-4">Tu Pedido</h1>
      
      {/* Listado de productos */}
      <div className='col-12 mb-4'>
        <CartList 
          items={combinedItems} 
          onAdd={handleAdd} 
          onRemove={handleRemove} 
          onDelete={handleDelete} 
        />
      </div>

      {/* Opciones de envío */}
      <div className='col-12 mb-4'>
        <CartSendOptions onProceedToPay={setSendOptions} />
      </div>

      {/* Opciones de pago */}
      {sendOptions && (
        <div className='col-12'>
          <CartBuyOptions cartListData={{ products: combinedItems, cost: totalCost }} cartSendOptionsData={sendOptions} />
        </div>
      )}

      {/* Costo total */}
      <div className='col-12'>
        <h3>Total: ${totalCost.toFixed(2)}</h3>
      </div>
    </main>
  );
};

export default CartPage;
