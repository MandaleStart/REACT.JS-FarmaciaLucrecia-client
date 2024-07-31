import { useParams } from 'react-router-dom';
import Sidebar from './Main/Sidebar/Sidebar';
import ItemListContainer from './ItemListContainer';
// eslint-disable-next-line react/prop-types
const CatContainer = () => {
    const { id } = useParams();
    
    return (
      <main className='row'>
        <div className='col-2 col-order-1'>
          <Sidebar />
        </div>
        <div className='col col-order-2 mt-3 mb-2'>
          <ItemListContainer categoria={id} filter='' />
        </div>
      </main>
    );
  };
  
  export default CatContainer;