import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/NavBar';
import Contact from './views/ContactPage';
import FavPage from './views/FavPage/FavPage';
import CartPage from './views/CartPages/CartPage';
import UserPage from './views/UserPage';
import SuccessPage from './views/SuccessPage';
import ErrorPage from './views/ErrorPage';
import SearchPage from './views/SearchPage';
import Index from  './views/Index';
import CatContainer from './components/Main/CatContainer/CatContainer';
import ItemDetailContainer from './components/Main/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import LoginPage from './views/LoginPage';
import SigninPage from './views/SigninPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/favoritos" element={<FavPage />} />
        <Route path="/usuario" element={<UserPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/category/:id" element={<CatContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/registro" element={<SigninPage />} />
        <Route path="/compra-exitosa" element={<SuccessPage />} /> 
        <Route path="*" element={<ErrorPage />} />
      </Routes> 
      <Footer />
    </BrowserRouter>
  );
};

export default App;
