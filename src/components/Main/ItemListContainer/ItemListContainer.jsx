import { useEffect, useState } from 'react';
import Item from '../item/item'
import { db } from '@utils/firedb';
// eslint-disable-next-line react/prop-types

const ItemListContainer = ({ categoria /*filtro=, stock ,price ,brands*/ }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await db.collection('products').get();
        const listaProductos = snapshot.docs.map((doc) => doc.data());
        setProductos(listaProductos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    loadProducts();
  }, []);

  const filteredProductos = categoria
    ? categoria === "all"
      ? productos
      : productos.filter((producto) => producto.categoria.id === categoria)
    : [];

  return (
    <div className="container row">
      {filteredProductos.map((producto) => (
        <div className="col-3 mt-2" key={producto.id}>
          <Item className="items" producto={producto} key={producto.id} />
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;