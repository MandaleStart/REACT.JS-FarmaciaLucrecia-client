import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const PBanner = () => {
    return (
        <Carousel className="justify-content-center align-items-center">
            <Carousel.Item >
                <Link to='/category/medicamentos'>
                    <img className='Pbanner-item' src="https://firebasestorage.googleapis.com/v0/b/lucrecia-pharmacy-app.appspot.com/o/perifar-banner-preview.png?alt=media&token=2a16462f-cdb3-4926-9eaf-a12d79882012" alt="banner perifar" />
                </Link>
            </Carousel.Item>
            <Carousel.Item >
                <Link to='/category/cosmetica'>
                    <img className='Pbanner-item' src="https://firebasestorage.googleapis.com/v0/b/lucrecia-pharmacy-app.appspot.com/o/PORTADA%20JULIO-BANNER%20SLIDER.png?alt=media&token=64373d7d-fc8b-4174-a591-d7ef5af247d7" alt="banner julio" />
                </Link>
            </Carousel.Item>
            <Carousel.Item >
                <Link to='/category/productos-naturales'>
                    
                        <img className='Pbanner-item' src="https://firebasestorage.googleapis.com/v0/b/lucrecia-pharmacy-app.appspot.com/o/Banner-Home-chia2.jpg?alt=media&token=db48cb52-fb1e-4bc7-8478-3e176032fabf" alt="madretierra-desayuno nutritivo " />

                </Link>
            </Carousel.Item>
            <Carousel.Item >
                <Link to='/category/cosmetica'>
                    <img className='Pbanner-item'src="https://firebasestorage.googleapis.com/v0/b/lucrecia-pharmacy-app.appspot.com/o/banners%2F22134-LP-SKIN-A-Spot-Banner-_1440px-x-480px_.webp?alt=media&token=5f006fb5-e50c-46fe-8935-63004f471a27" alt="banner julio" />
                </Link>
            </Carousel.Item>
        </Carousel>
    );
};

export default PBanner;
