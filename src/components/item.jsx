/* eslint-disable react/prop-types */
import { FaPlus, FaCartPlus, FaMinus, FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, addToFav } from '@utils/utils';

const Item = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1); // Estado para manejar la cantidad

  const renderProducto = producto.image ?? "https://i.ibb.co/MpG69V7/nofoto.png";

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
    <div className="card h-100 items">
      <Link className='no-a text-reset wb' to={`/item/${producto.id}`} >
        <img className="card-img-top" src={renderProducto} alt={producto.name} />
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="card-title">{producto.name}</h5>
        </div>
      </Link>
      <div className="alert mb-0">
        $ {producto.cost}
      </div>
      <div className="card-footer d-flex flex-column align-items-center">
        <div className="d-flex align-items-center mb-2">
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
        <button onClick={() => addToCart(producto, cantidad)} className="btn btn-success btn-block mb-2">
          <FaCartPlus /> Comprar
        </button>
        <button onClick={() => addToFav(producto)} className="btn btn-warning btn-block">
          <FaPlusCircle /> Favoritos
        </button>
      </div>
    </div>
  );
};

export default Item;