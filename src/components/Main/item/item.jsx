/* eslint-disable react/prop-types */
import { FaPlus, FaCartPlus} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addToCart, addToFav } from '@utils/utils';

const Item = ({ producto }) => {

  const renderProducto = producto.image ?? "https://i.ibb.co/MpG69V7/nofoto.png";
  

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
      <div className="card-footer d-flex justify-content-between align-items-center">
        <button onClick={() => addToCart(producto)} className="btn btn-success btn-block">
          <FaCartPlus />  Comprar
        </button>
        <button onClick={() => addToFav(producto)} className="btn btn-warning btn-block">
          <FaPlus /> Favoritos
        </button>
      </div>
    </div>
  );
};

export default Item;