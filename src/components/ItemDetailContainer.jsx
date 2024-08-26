import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';
import { db } from '@utils/firebase';
import { addToCart, addToFav } from '@utils/utils';

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Estado para manejar la cantidad
  const { id } = useParams();

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

  // Función para incrementar la cantidad
  const incrementarCantidad = () => {
    setCantidad(prevCantidad => prevCantidad + 1);
  };

  // Función para decrementar la cantidad
  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(prevCantidad => prevCantidad - 1);
    }
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
        <button onClick={() => addToCart(producto, cantidad)} className="btn btn-success mb-2">
          <FaCartPlus /> Agregar al Carrito
        </button>
        <button onClick={() => addToFav(producto)} className="btn btn-warning btn-block">
          <FaHeart /> Agregar a Favoritos
        </button>
      </div>
    </main>
  );
};

export default ItemDetailContainer;
