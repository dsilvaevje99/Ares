import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserStore from '../Stores/UserStore';
import PagesJson from '../JsonData/pages.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

const isLoggedIn = UserStore.isLoggedIn;
const { pages } = PagesJson;

class Nav extends Component {
    render() {

        if(isLoggedIn) {
            return (
                <nav id="adminNav">
                    <ul>
                        {
                            pages.map(function(page){
                                return (
                                    <Link to={page.route} className="adminLink" key={page.title}><li>{page.title}</li></Link>
                                );
                            })
                        }
                        <a href="https://www.facebook.com/Ares-Turn-104990971341522" target="_blank" rel="noreferrer" className="socialIcon" key="facebookIcon"><li><FontAwesomeIcon icon={ faFacebookSquare } /></li></a>
                    </ul>
                </nav>
            );
        } else {
            return (

                <nav>
                    <ul>
                        {
                            pages.map(function(page){
                                if(!page.private) {
                                    return (
                                        <Link to={page.route} key={page.title}><li>{page.title}</li></Link>
                                    );
                                }
                                return null;
                            })
                        }
                        <a href="https://www.facebook.com/Ares-Turn-104990971341522" target="_blank" rel="noreferrer" className="socialIcon" key="facebookIcon"><li><FontAwesomeIcon icon={ faFacebookSquare } /></li></a>
                    </ul>
                </nav>
    
            );
        }

    }
}

export default Nav;