
// Formulario para las opciones de envío
export const CartSendOptions = () => {
    return (
      <div className="cart-send-options">
        <h3>Opciones de Envío</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="shippingAddress" className="form-label">Dirección de Envío</label>
            <input type="text" className="form-control" id="shippingAddress" placeholder="Ingresa tu dirección" />
          </div>
          <div className="mb-3">
            <label htmlFor="shippingMethod" className="form-label">Método de Envío</label>
            <select className="form-select" id="shippingMethod">
              <option value="standard">Envío Estándar</option>
              <option value="express">Envío Express</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Confirmar Envío</button>
        </form>
      </div>
    );
  };
  
  // Opciones de pago
  export const CartBuyOptions = () => {
    return (
      <div className="cart-buy-options">
        <h3>Opciones de Pago</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">Método de Pago</label>
            <select className="form-select" id="paymentMethod">
              <option value="credit">Tarjeta de Crédito</option>
              <option value="debit">Tarjeta de Débito</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Pagar Ahora</button>
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