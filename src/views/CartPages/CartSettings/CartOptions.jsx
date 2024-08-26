import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@utils/firedb';
import { getUserIDN } from '@utils/utils';
export const CartSendOptions = ({ onProceedToPay }) => {
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [selectedCiudad, setSelectedCiudad] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [ciudades, setCiudades] = useState([]);

    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                const docRef = db.collection('data').doc('departamentos');
                const doc = await docRef.get();

                if (doc.exists) {
                    const data = doc.data();
                    const departamentosList = Object.keys(data).map((key) => ({
                        name: data[key].name,
                        cities: Object.keys(data[key].cities)
                    }));
                    setDepartamentos(departamentosList);
                }
            } catch (error) {
                console.error('Error al obtener los departamentos:', error);
            }
        };

        fetchDepartamentos();
    }, []);

    const handleDepartamentoChange = (event) => {
        const selectedDepartamento = event.target.value;
        setSelectedDepartamento(selectedDepartamento);

        const departamento = departamentos.find((dep) => dep.name === selectedDepartamento);
        if (departamento) {
            setCiudades(departamento.cities);
        } else {
            setCiudades([]);
        }

        setSelectedCiudad('');
    };

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    const handleCiudadChange = (event) => {
        setSelectedCiudad(event.target.value);
    };

    const handleProceedToPay = () => {
        if (!selectedDepartamento) {
            alert('Seleccione un departamento');
        } else if (!selectedCiudad) {
            alert('Seleccione una ciudad');
        } else if (!selectedAddress) {
            alert('Complete la dirección');
        } else {
            onProceedToPay({
                city: selectedCiudad,
                state: selectedDepartamento,
                address: selectedAddress,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="col-5 col-order-3 wb wb2">
            <h2>Opciones de Envío</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="departamento">Departamento:</label>
                    <select id="departamento" className="form-control" value={selectedDepartamento} onChange={handleDepartamentoChange}>
                        <option value="">Seleccionar departamento</option>
                        {departamentos.map((departamento) => (
                            <option value={departamento.name} key={departamento.name}>
                                {departamento.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ciudad">Ciudad:</label>
                    <select id="ciudad" className="form-control" value={selectedCiudad} onChange={handleCiudadChange}>
                        <option value="">Seleccionar ciudad</option>
                        {ciudades.map((ciudad) => (
                            <option value={ciudad} key={ciudad}>
                                {ciudad}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="calle">Calle:</label>
                    <input type="text" id="calle" className="form-control" value={selectedAddress} onChange={handleAddressChange} />
                </div>
                <button className="btn btn-success" onClick={handleProceedToPay} type="submit">Proceder a Pagar</button>
            </form>
        </div>
    );
};

// Componente para las opciones de pago
export const CartBuyOptions = ({ cartListData, cartSendOptionsData }) => {
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [nombreTarjeta, setNombreTarjeta] = useState('');
    const [fechaExpiracion, setFechaExpiracion] = useState('');
    const [cvv, setCvv] = useState('');

    const finishedBuy = async () => {
        try {
            const userId = await getUserIDN(); // Espera a que la promesa se resuelva
    
            const ordenesRef = db.collection('ordenes');
            const snapshot = await ordenesRef.get();
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
                user: userId, // Utiliza el userId resuelto
                cost: cartListData.cost
            };
    
            await ordenesRef.doc(String(nuevoId)).set(newOrder);
            console.log('Nuevo pedido agregado con éxito!');
            navigate('/compra-exitosa');
        } catch (error) {
            console.error('Error al agregar el pedido:', error);
        }
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
        <div className="col-5 col-order-3 wb wb2">
            <h2>Opciones de Pago</h2>
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

                <button className="btn btn-primary" type="submit" onClick={finishedBuy}>Finalizar Compra</button>
            </form>
        </div>
    );
};

// Tabla para mostrar los productos en el carrito
export const CartList = ({ items }) => {
    return (

        <div className="cart-list">
            <h3>Productos en tu Carrito</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.cost}</td>
                            <td>{item.cantidad * item.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};