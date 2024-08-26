import React, { useEffect, useState } from 'react';
import { CartSendOptions, CartBuyOptions, CartList } from './CartSettings/CartOptions';
import { fetchCartData } from '@utils/utils';
import { userID } from '@utils/session';
import { db } from '@utils/firedb';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const user = userID;
        if (user) {
          const fetchedItems = await fetchCartData(user);
          // Extrae 'id' y 'cantidad' desde los datos del carrito
          const itemDetails = fetchedItems.map(item => ({
            id: item.id,  // ID del producto
            cantidad: item.cant  // Cantidad del producto
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
          id: doc.data().id, // ID del producto en Firestore
          name: doc.data().name, // Nombre del producto
          cost: doc.data().cost // Costo del producto
        }));
        setProductos(listaProductos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    loadProducts();
  }, []);

  // Combinar los datos del carrito con los productos
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
  // Calcular el costo total
  const totalCost = combinedItems.reduce((acc, item) => {
    return acc + (item.cost || 0) * (item.cantidad || 0);
  }, 0);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="container row d-flex justify-content-between">
      <h1 className="mb-4">Tu Pedido</h1>
      <div className='col-12 col-md-8 mb-4'>
        <CartList items={combinedItems} />
      </div>
      <div className='col-12 col-md-4 mb-4'>
        <CartSendOptions />
      </div>
      <div className='col-12 col-md-4'>
        <CartBuyOptions />
      </div>
      <div className='col-12'>
        <h3>Total: ${totalCost.toFixed(2)}</h3>
      </div>
    </main>
  );
};

export default CartPage;
