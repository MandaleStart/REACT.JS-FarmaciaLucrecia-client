import { useState } from 'react';

const StockHider = () => {
  const [mostrarSinStock, setMostrarSinStock] = useState(true);

  const handleClick = () => {
    setMostrarSinStock(!mostrarSinStock);
  };

  const textoBoton = mostrarSinStock ? 'Ocultar sin stock' : 'Mostrar sin stock';
  const valorRetorno = mostrarSinStock ? 1 : 0;

  return (
    <div>
      <button onClick={handleClick}>{textoBoton}</button>
      <p>Valor de retorno: {valorRetorno}</p> {/*para testear*/}
    </div>
  );
};

export default StockHider;