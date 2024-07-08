//import StockHider from './StockHider/stockHider';
//import PriceFilter from './PriceFilter/PriceFilter';
//import BrandsFilter from './BrandsFilter/BrandsFilter';
const Sidebar = () => {


  return (
    <div className="col col-order-1 mt-4 mx-2">
    <div className="alert bg-light">
      <h2>Filtrado</h2>
      <div className='alert alert-danger'>Funcionalidad en desarrollo</div>
      
      <div className="filter-section">
        <h3>Stock</h3>
        <div className='alert alert-danger'>Funcionalidad en desarrollo</div>
       {/* <StockHider />*/}
      </div>
      <hr /> {/* borrar despues */}
      <div className="filter-section">
        <h3>Precio</h3>
        <div className='alert alert-danger'>Funcionalidad en desarrollo</div>
        {/* <PriceFilter />*/}
      </div>
      <hr /> {/* borrar despues */}
      <div className="filter-section">
        <h3>Marcas</h3>
        <div className='alert alert-danger'>Funcionalidad en desarrollo</div>
         {/*<BrandsFilter />*/}
      </div>
      
    </div></div>
  );
};

export default Sidebar;