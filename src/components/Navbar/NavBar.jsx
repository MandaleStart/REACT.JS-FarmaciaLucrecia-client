
import Logo from './Logo/Logo';
import './navbar.css'
import SearchBar from './SearchBar/SearchBar';
import Categories from './Categories/Categories';
import UserControl from './UserControl/UserControl'


const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <div className="container ">
        <Logo className='col-4'/>
        <SearchBar className='col-3'/>
        <UserControl className='col-4'/>
      </div>
     
     <Categories />
     
    </nav>
  );
};

export default Navbar;