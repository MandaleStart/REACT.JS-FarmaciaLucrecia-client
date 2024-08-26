import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';
import { db } from '@utils/firebase';
import { addToCart, addToFav } from '@utils/utils';
import { CountContext } from '@utils/CountProvider'; 

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1); 
  const { id } = useParams();
  
  // Acceder a los métodos del contexto
  const { setCartItemsCount, setFavoriteItemsCount } = useContext(CountContext);

  useEffect(() => {
    const fetchProducto = async () => {
      const productoRef = db.collection('products').where('id', '==', Number(id));
      const productoSnapshot = await productoRef.get();
      if (!productoSnapshot.empty) {
        setProducto(productoSnapshot.docs[0].data());
      }
    };

    fetchProducto();
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
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

  return (
    <main className="container row w-100 justify-content-center">
      <div className="wb col-5 col-order-1">
        <img src={renderProducto} alt={producto.name} className="img-fluid" />
      </div>
      <div className="wb col-5 col-order-2">
        <h1>{producto.name}</h1>
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
