/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@utils/firedb';

const user = localStorage.getItem('user')


const CartBuyOptions = ({ cartListData, cartSendOptionsData }) => {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [cvv, setCvv] = useState('');

  const finishedBuy = () => {
    const ordenesRef = db.collection('ordenes');
    ordenesRef.get().then((snapshot) => {
      const cantidadDocumentos = snapshot.size;
      const nuevoId = cantidadDocumentos + 1;

      const newOrder = {
        id: nuevoId,
        address: cartSendOptionsData.address,
        state: `${cartSendOptionsData.city}, ${cartSendOptionsData.state}`,
        createdDate: new Date(),
        deliveryDate: '',
        products: cartListData.products,
        status: 'pendiente',
        user: user,
        cost: cartListData.cost
      };

      ordenesRef.doc(String(nuevoId)).set(newOrder).then(() => {
        console.log('Nuevo pedido agregado con éxito!');
        navigate('/compra-exitosa');
      }).catch((error) => {console.error('Error al agregar el pedido:', error);});}).catch((error) => {
        console.error('Error al obtener la cantidad de documentos:', error);
      });

  };

  const handleMetodoPagoChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const handleNumeroTarjetaChange = (event) => {
    setNumeroTarjeta(event.target.value);
  };

  const handleNombreTarjetaChange = (event) => {
    setNombreTarjeta(event.target.value);
  };

  const handleFechaExpiracionChange = (event) => {
    setFechaExpiracion(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const renderPagoForm = () => {
    if (metodoPago === 'tarjeta') {
      return (
        <div>
          <h3>Formulario de Tarjeta de Crédito</h3>
          <div className="form-group">
            <label htmlFor="numeroTarjeta">Número de Tarjeta:</label>
            <input
              type="text"
              id="numeroTarjeta"
              className="form-control"
              value={numeroTarjeta}
              onChange={handleNumeroTarjetaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreTarjeta">Nombre en la Tarjeta:</label>
            <input
              type="text"
              id="nombreTarjeta"
              className="form-control"
              value={nombreTarjeta}
              onChange={handleNombreTarjetaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaExpiracion">Fecha de Expiración:</label>
            <input
              type="text"
              id="fechaExpiracion"
              className="form-control"
              value={fechaExpiracion}
              onChange={handleFechaExpiracionChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              className="form-control"
              value={cvv}
              onChange={handleCvvChange}
            />
          </div>
        </div>
      );
    } else if (metodoPago === 'paypal') {
      return (
        <div>
          <h3>Formulario de PayPal</h3>
        </div>
      );
    } else if (metodoPago === 'transferencia') {
      return (
        <div>
          <h3>Formulario de Transferencia Bancaria</h3>
        </div>
      );
    } else if (metodoPago === 'mercado-pago') {
      return (
        <div>
          <h3>Formulario de Mercado Pago</h3>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="col-5 col-order-3 wb wb2"><h2>Opciones de Pago</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="metodoPago">Método de pago:</label>
          <select
            id="metodoPago"
            className="form-control"
            value={metodoPago}
            onChange={handleMetodoPagoChange}
          >
            <option value="">Seleccionar método de pago</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="mercado-pago">Mercado Pago</option>
            <option value="transferencia">Transferencia bancaria</option>
          </select>
        </div>
        {renderPagoForm()}

        <button className="btn btn-primary" type="submit" onClick={finishedBuy}>
          Realizar Pedido
        </button>
      </form>
    </div>
  );
};

export default CartBuyOptions;
