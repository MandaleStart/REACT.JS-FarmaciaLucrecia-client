import { useState, useEffect } from 'react';
import { db } from '@utils/firedb';

// eslint-disable-next-line react/prop-types
const CartSendOptions = ({ onProceedToPay }) => {
  const handleProceedToPay = () => {
    if (!selectedDepartamento) {
      alert('Seleccione departamento')
    } else if (!selectedCiudad) {
      alert('Seleccione ciudad')
    } else if (!selectedAddress) { alert('Complete direccion') }
    else {
      onProceedToPay({
        city: selectedCiudad,
        state: selectedDepartamento,
        address: selectedAddress,
      });
    }
  }

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

    // Obtener las ciudades correspondientes al departamento seleccionado
    const departamento = departamentos.find((dep) => dep.name === selectedDepartamento);
    if (departamento) {
      setCiudades(departamento.cities);
    } else {
      setCiudades([]);
    }

    // Restablecer la selección de ciudad
    setSelectedCiudad('');
  };
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  const handleCiudadChange = (event) => {
    setSelectedCiudad(event.target.value);
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

export default CartSendOptions;


