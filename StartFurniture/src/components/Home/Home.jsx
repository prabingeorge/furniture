import { useContext } from "react";
import { Link } from 'react-router-dom';
import AppCarousel from './../Carousel/Carousel';
import { CartContext } from "../../contexts/Cart";
import './index.css';

const Home = () => {

    const { addSelectedCategoryToCart } = useContext(CartContext);

    return (
        <div className="home-view">
            <div className="carousel-container">
                <AppCarousel></AppCarousel>
            </div>
            <div className='place-order-container'>
                <Link to={'/dashboard'} onClick={()=>addSelectedCategoryToCart(1)} className='order-button'>View & Place Order</Link>
            </div>
            <div className="footer-container">
                <div>
                    <label className='label'>Info:</label>
                    <div className='info-details'>
                        <Link>Contact Us</Link>
                        <Link>Term of Services</Link>
                        <Link>Privacy Policy</Link>
                    </div>
                </div>
                <label className='label'>Our Mission:</label>
                <div className='misson-details'>
                    <p className='description'>Teak (Tectona grandis) is a tropical hardwood tree species in the family Lamiaceae. It is a large, deciduous tree that occurs in mixed hardwood forests. Tectona grandis has small, fragrant white flowers arranged in dense clusters (panicles) at the end of the branches. These flowers contain both types of reproductive organs (perfect flowers). The large, papery leaves of teak trees are often hairy on the lower surface.</p>
                </div>
            </div>
        </div>
    )
};

export { Home };