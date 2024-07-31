import PBanner from '@components/Main/Banner/PBanner'
import ItemListContainer from '@components/ItemListContainer';
const Index = () => {
    return (
    <main className='container'>
    <div className='col'>
        <PBanner/>
        <ItemListContainer categoria="all" filter="" className=''/>
    </div>
    
    </main>
    )
    
    }
    export default Index
