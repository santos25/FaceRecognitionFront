import React from 'react';
import './Nav.css';

const Nav = ({ isSignedIn , onChangeRoute}) => {

    if (isSignedIn) {
        return (
            <nav className='signNav'>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onChangeRoute('SignIn' )}>Sign Out</p>
            </nav>
        )
    } else 
        return (
            <nav className='signNav'>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onChangeRoute('SignIn')}>Sign In</p>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onChangeRoute('register')}>Register</p>
            </nav>
        )
    }





export default Nav;