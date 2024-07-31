import { useEffect, useState } from 'react';
import { db } from '@utils/firedb';

// eslint-disable-next-line react/prop-types
const CartList = ({ onShowSendOptions }) => {
  const user = localStorage.getItem('user');
  const [productos, setProductos] = useState([]);
  const [totalCartCost, setTotalCartCost] = useState(0);
  const [quantities, setQuantities] = useState({});

  const handleShowSendOptions = () => {
    console.log(quantities)
    onShowSendOptions({
      products: quantities,
      cost: totalCartCost,
    });
  };
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const usuarioRef = db.collection('usuarios').doc(user);
        const usuarioSnapshot = await usuarioRef.get();
        const cartIds = usuarioSnapshot.get('cart');
        const productosRef = db.collection('products');
        const productosData = [];

        for (const cartId of cartIds) {
          const productoQuerySnapshot = await productosRef.where('id', '==', cartId).get();
          const productoDoc = productoQuerySnapshot.docs[0];
          if (productoDoc) {
            const productoData = productoDoc.data();
            productosData.push(productoData);
            setQuantities((prevQuantities) => ({
              ...prevQuantities,
              [productoData.id]: 1,
            }));
          }
        }

        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener los datos del carrito:', error);
      }
    };

    fetchCartData();
  }, [user]);

  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(1, value || 1);

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };
  const handleCartDelete = (id) => {
    try {
      if (!user) {
        console.log('No hay usuario autenticado.');
        return;
      }

      const userRef = db.collection('usuarios').doc(user);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const cartArray = doc.data().cart;
          const updatedCartArray = cartArray.filter((item) => item !== id);
          userRef
            .update({ cart: updatedCartArray })
            .then(() => {
              console.log('Elemento eliminado del array cart.');
            })
            .catch((error) => {
              console.error('Error al actualizar el documento:', error);
            });
        } else {
          console.log('El documento del usuario no existe.');
        }
      });
    } catch (error) {
      console.error('Error al borrar los datos:', error);
    }
  };

  useEffect(() => {
    const totalCost = productos.reduce((total, producto) => {
      return total + (producto.cost * quantities[producto.id]);
    }, 0);

    setTotalCartCost(totalCost);
  }, [productos, quantities]);

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>

            <th>FOTO</th>
            <th>NOMBRE</th>
            <th>CANTIDAD</th>
            <th>COSTO/UNIDAD</th>
            <th>COSTO TOTAL</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <img src={producto.image} width={50} alt={producto.name} />
              </td>
              <td>{producto.name}</td>
              <td>
                <input
                  id="cant"
                  className="form-control"
                  type="number"
                  placeholder="1"
                  value={quantities[producto.id]}
                  onChange={(e) => handleQuantityChange(producto.id, parseInt(e.target.value))}
                />
              </td>
              <td>$ {producto.cost}</td>
              <td>$ {producto.cost * quantities[producto.id]}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleCartDelete(producto.id)}>
                  X Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">TOTAL:</td>
            <td>$ {totalCartCost}</td>
            <td>
              <button className="btn btn-primary" onClick={handleShowSendOptions}>
                Pasar al envio
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default CartList;