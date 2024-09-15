import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { CountContext } from './utils/CartContext'; 
import Navbar from '@components/Navbar/NavBar';
import Contact from './views/ContactPage';
import FavPage from './views/FavPage/FavPage';
import CartPage from './views/CartPages/CartPage';
import UserPage from './views/UserPage';
import SuccessPage from './views/SuccessPage';
import ErrorPage from './views/ErrorPage';
import SearchPage from './views/SearchPage';
import Index from './views/Index';
import CatContainer from '@components/CatContainer';
import ItemDetailContainer from '@components/ItemDetailContainer';
import Footer from '@components/Footer/Footer';
import LoginPage from './views/LoginPage';
import SigninPage from './views/SigninPage';

import { Spinner } from 'react-bootstrap';

const App = () => {
  const { user, loading } = useContext(CountContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/favoritos" element={user ? <FavPage /> : <LoginPage />} />
        <Route path="/usuario" element={user ? <UserPage /> : <LoginPage />} />
        <Route path="/carrito" element={user ? <CartPage /> : <LoginPage />} />
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
