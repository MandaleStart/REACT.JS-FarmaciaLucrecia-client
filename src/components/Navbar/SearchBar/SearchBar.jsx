import { FaSearch } from 'react-icons/fa';
const SearchBar = () => {
    return (
      <form className="d-flex col-md-4">
        <input disabled id="search-input" className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" />
        <button disabled id="search-button" className="btn btn-outline-success" type="submit">
        <FaSearch />
        </button>
      </form>
    );
  };
  
  export default SearchBar;