import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
// eslint-disable-next-line react/prop-types
const FavoriteWidget = ({favoriteItemsCount}) => {

  return (
    <Link className="favorite-widget text-reset alert alert-warning" to='/favoritos'>
      <FaHeart className="favorite-icon" />
      <span className="favorite-count">{favoriteItemsCount}</span>
    </Link>
  );
};

export default FavoriteWidget;