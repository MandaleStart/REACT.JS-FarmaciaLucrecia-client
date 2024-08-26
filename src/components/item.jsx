import { FaPlus, FaCartPlus, FaMinus, FaPlusCircle } from 'react-icons/fa';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, addToFav } from '@utils/utils';
import { CountContext } from '@utils/CountProvider';

const Item = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1); 
  const { setCartItemsCount, setFavoriteItemsCount } = useContext(CountContext);

  const renderProducto = producto.image ?? "https://i.ibb.co/MpG69V7/nofoto.png";

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
      <div className="card-footer">
        <div className="d-flex flex-column align-items-center">
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

          <button onClick={handleAddToCart} className="btn btn-success btn-block mb-2">
            <FaCartPlus /> Comprar
          </button>
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={handleAddToFav} className="btn btn-warning">
            <FaPlusCircle /> Favoritos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
