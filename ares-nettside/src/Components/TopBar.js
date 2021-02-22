import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
/*import UserStore from '../Stores/UserStore';

const isLoggedIn = UserStore.isLoggedIn;

console.log(UserStore.isLoggedIn);
*/
const TopBar = (props) => (
        <div className="topBarContainer">
            <div>
                <img src={logo} id="logo"  alt="logo" />
                <h1>Ares Turnforening</h1>
            </div>
            {
                props.isLoggedIn ?
                    <Link to="/" className="btn topBarBtn redBtn" onClick={props.doLogOut}>Logg ut</Link>
                    :
                    <Link to="/logginn" className="btn topBarBtn whiteBtn"><FontAwesomeIcon icon={faUser} /> Logg inn</Link>
            }
        </div>
    );

export default TopBar;