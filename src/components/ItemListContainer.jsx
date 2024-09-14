import { useEffect, useState } from 'react';
import Item from './item';
import { db } from '@utils/firedb';
// eslint-disable-next-line react/prop-types

const ItemListContainer = ({ categoria }) => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await db.collection('products').get();
        const listaProductos = snapshot.docs.map((doc) => doc.data());
        setProductos(listaProductos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // spinner 
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  }

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
