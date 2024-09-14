import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';
import { db } from '@utils/firebase';
import { addToCart, addToFav } from '@utils/utils';
import { CountContext } from '@utils/CartContext'; 

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1); 
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const { id } = useParams();
  
  // Acceder a los métodos del contexto
  const { setCartItemsCount, setFavoriteItemsCount } = useContext(CountContext);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const productoRef = db.collection('products').where('id', '==', Number(id));
        const productoSnapshot = await productoRef.get();
        if (!productoSnapshot.empty) {
          setProducto(productoSnapshot.docs[0].data());
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetchProducto();
  }, [id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  const renderProducto = producto.image ?? 'https://i.ibb.co/MpG69V7/nofoto.png';

  const incrementarCantidad = () => {
    setCantidad(prevCantidad => prevCantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(prevCantidad => prevCantidad - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    setCartItemsCount(prevCount => prevCount + cantidad); // Actualiza el contador de carrito
  };

  const handleAddToFav = () => {
    addToFav(producto);
    setFavoriteItemsCount(prevCount => prevCount + 1); // Actualiza el contador de favoritos
  };

  const descripcionProducto = producto.desc ? producto.desc : 'Sin descripción del producto';
  
  return (
    <main className="container row w-100 justify-content-center">
      <div className="wb col-5 col-order-1">
        <img src={renderProducto} alt={producto.name} className="img-fluid" />
      </div>
      <div className="wb col-5 col-order-2">
        <h1>{producto.name}</h1>
        <p className="mb-3">{descripcionProducto}</p>
        <p className="mb-3">Stock: {producto.stock} disponibles</p>
        <p className="mb-3">${producto.cost}</p>
        <div className="d-flex align-items-center mb-3">
          <button className="btn btn-outline-secondary btn-sm" onClick={decrementarCantidad}>
            <FaMinus />
          </button>
          <input 
            type="number" 
            className="form-control text-center mx-2" 
            value={cantidad} 
            readOnly 
            style={{ width: '50px' }} 
          />
          <button className="btn btn-outline-secondary btn-sm" onClick={incrementarCantidad}>
            <FaPlus />
          </button>
        </div>
        <button onClick={handleAddToCart} className="btn btn-success mb-2">
          <FaCartPlus /> Agregar al Carrito
        </button>
        <button onClick={handleAddToFav} className="btn btn-warning btn-block">
          <FaHeart /> Agregar a Favoritos
        </button>
      </div>
    </main>
  );
};

export default ItemDetailContainer;
