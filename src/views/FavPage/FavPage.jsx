import { useEffect, useState } from 'react';
import { db } from '../../../firedb';

const FavPage = () => {
  const user = localStorage.getItem('user');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchFavData = async () => {
      try {
        if (!user) return;

        const usuarioRef = db.collection('usuarios').doc(user);
        const usuarioSnapshot = await usuarioRef.get();
        const FavIds = usuarioSnapshot.get('fav');

        if (!Array.isArray(FavIds)) return;

        const productosRef = db.collection('products');
        const productosData = [];

        for (const FavId of FavIds) {
          const productoQuerySnapshot = await productosRef.where('id', '==', FavId).get();
          const productoDoc = productoQuerySnapshot.docs[0];
          if (productoDoc) {
            const productoData = productoDoc.data();
            productosData.push(productoData);
          }
        }
        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchFavData();
  }, [user]);

  const handleFavDelete = (id) => {
    try {
      if (!user) {
        console.log('No hay usuario autenticado.');
        return;
      }

      const userRef = db.collection('usuarios').doc(user);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const favArray = doc.data().fav;
          const updatedFavArray = favArray.filter((item) => item !== id);
          userRef
            .update({ fav: updatedFavArray })
            .then(() => {
              console.log('Elemento eliminado del array fav.');
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

  return (
    <main className="container row">
      <h1>Zona de favoritos</h1>
      <div className="container">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>FOTO</th>
              <th>NOMBRE</th>

              <th>COSTO</th>
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

                <td>${producto.cost}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleFavDelete(producto.id)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default FavPage;
