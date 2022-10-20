import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../UserContext/UserContext';
import './Header.css';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);
    console.log(user)
    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="logo" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.email ?
                        <span>
                            <button variant="secondary" size="sm" onClick={handleSignOut}>Log out</button>

                        </span>

                        :
                        <>
                            <Link to="/login"><button variant="secondary" size="sm">Log in</button></Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                },

            </div>

        </nav>
    );
};

export default Header;