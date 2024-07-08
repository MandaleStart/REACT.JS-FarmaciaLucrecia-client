import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import {useEffect , useState} from 'react';
import {db} from '../../../../../firedb'
import { userID } from '../../../../utils/session';


// eslint-disable-next-line react/prop-types
const FavoriteWidget = () => {
  
const [favoriteItemsCount, setFavItemsCount] = useState(0);

  useEffect(() => {
    if (userID) {
      db.collection('usuarios').doc(userID).get()
        .then((doc) => {
          if (doc.exists) {
            const favArray = doc.data().fav;
            setFavItemsCount(favArray.length);
          } else {
            setFavItemsCount(0);
          }
        })
        .catch((error) => {
          console.error('Error al obtener datos del usuario:', error);
          setFavItemsCount(0);
        });
    } else {
      setFavItemsCount(0);
    }
  }, [userID]);

  return (
    <Link className="favorite-widget text-reset alert alert-warning" to='/favoritos'>
      <FaHeart className="favorite-icon" />
      <span className="favorite-count">{favoriteItemsCount}</span>
    </Link>
  );
};

export default FavoriteWidget;