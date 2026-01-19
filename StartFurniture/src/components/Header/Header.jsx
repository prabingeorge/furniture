import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/Cart";
import "./index.css";
import starLogo from "../../assets/images/header/star-logo.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelopeCircleCheck, faSignOut, faSignIn, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

    const { user, logout } = useAuth();
    const { totalCartCount } = useContext(CartContext);

    return (
        <div className="header-view">
            <div className="header">
                <div className="header-wrapper">
                    <ul className="left-menu">
                        <li>
                            <label className="active-menu">Events</label>
                        </li>
                    </ul>
                    <ul className="right-menu">
                        <li>
                            <FontAwesomeIcon icon={faPhone} size="1x" style={{ color: '#ffa500' }} /> +91 8904761075
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelopeCircleCheck} size="1x" style={{ color: '#ffa500' }} /> prabingeorge@gmail.com
                        </li>
                    </ul>

                </div>
            </div>
            <div className="middle-header">
                <div>
                    <Link to={'/home'}>
                        <img src={starLogo} alt="logo" className="header-logo" />
                    </Link>
                </div>
                <div className="menu-container">
                    {user?.name ? <>
                        <label onClick={logout}>
                            {user?.name}
                            <FontAwesomeIcon icon={faSignOut} size="1x" style={{ color: '#ffa500', paddingLeft: '5px' }} />
                        </label>
                    </> :
                        <label>
                            <FontAwesomeIcon icon={faSignIn} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                            <Link to="/login">Sign In</Link>
                        </label>}
                    <label>
                        <FontAwesomeIcon icon={faHeart} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                        Wishlist (0)
                    </label>
                    <label>
                        <FontAwesomeIcon icon={faCartShopping} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                        Cart ({totalCartCount()})
                    </label>
                </div>
            </div>
        </div>
    )
};

export default Header;