import React, { useContext, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Link } from 'react-router-dom';

export default function Hamburguer() {
    const [isOpen, setIsOpen] = useState(false)
    const {isLoggedIn, logout} = useContext(SessionContext)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    return (
      <div className='hamburger-container'>
        <div className='hamburger' onClick={toggleMenu}>
            <img src="/images/icon-menu.png"></img>
        </div>

        <div className={`drops ${isOpen ? 'large' : 'small'} `}>
            {!isLoggedIn && <Link to="/signup">Signup</Link>}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {isLoggedIn && <Link to="/profile">Profile</Link>}
            {isLoggedIn && <Link to="/allskills">Skills Venue</Link>}
            {isLoggedIn && <Link to="/allevents">Events Venue</Link>}
            {isLoggedIn && <button onClick={logout}>Logout</button>}
        </div>
      </div>
    );
  }