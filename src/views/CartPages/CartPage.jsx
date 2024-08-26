import React, { useEffect, useState } from 'react';
import { CartSendOptions, CartBuyOptions, CartList } from './CartSettings/CartOptions';
import { fetchCartData } from '@utils/utils';
import { userID } from '@utils/session';
import { db } from '@utils/firedb';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [sendOptions, setSendOptions] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const user = userID;
        if (user) {
          const fetchedItems = await fetchCartData(user);
          const itemDetails = fetchedItems.map(item => ({
            id: item.id,
            cantidad: item.cant
          }));
          setItems(itemDetails);
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

  const combinedItems = items.map(item => {
    const product = productos.find(prod => prod.id === item.id);
    
    if (product) {
      return {
        id: item.id,
        cantidad: item.cantidad,
        name: product.name,
        cost: product.cost
      };
    }
    return {
      id: item.id,
      cantidad: item.cantidad,
      name: 'Desconocido',
      cost: 0
    };
  });

  const totalCost = combinedItems.reduce((acc, item) => {
    return acc + (item.cost || 0) * (item.cantidad || 0);
  }, 0);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="container row d-flex justify-content-between">
      <h1 className="mb-4">Tu Pedido</h1>
      
      {/* Listado de productos */}
      <div className='col-12 mb-4'>
        <CartList items={combinedItems} />
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
