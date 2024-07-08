import { useState } from 'react';
import CartSendOptions from './CartSettings/CartSendOptions';
import CartBuyOptions from './CartSettings/CartBuyOptions';
import CartList from './CartTable/CartList';

const CartPage = () => {
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [showBuyOptions, setShowBuyOptions] = useState(false);
  const [shippingData, setShippingData] = useState(null);
  const [cartListData, setCartListData] = useState(null);

  const handleShowSendOptions = (data) => {
    setShowShippingOptions(true);
    setCartListData(data)
  };

  const handleShowBuyOptions = (data) => {
    setShippingData(data);

    setShowBuyOptions(true);
  };

  return (
    <main className="container row d-flex justify-content-between ">
      <h1>Tu Pedido</h1>
      <div className='col-10 col-order-1 w-100'>
        <CartList onShowSendOptions={handleShowSendOptions} />
      </div>
      <div >

        {showShippingOptions && (
          <CartSendOptions onProceedToPay={handleShowBuyOptions} />
        )}
      </div>
      <div >

        {showBuyOptions && <CartBuyOptions
           cartListData={cartListData} cartSendOptionsData={shippingData} />
          }
      </div>
    </main>
  );
};

export default CartPage;
