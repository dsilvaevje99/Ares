import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import PagesJson from '../JsonData/pages.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
/*import UserStore from '../Stores/UserStore';

const isLoggedIn = UserStore.isLoggedIn;*/
const { pages } = PagesJson;

class Nav extends Component {
    render() {

        if(this.props.isLoggedIn) {
            return (
                <nav id="adminNav">
                    <ul>
                        <Link to="Dashboard" className="adminLink"><li>Dashbord</li></Link>
                        <br/>
                        {
                            pages.map(function(page){
                                if(page.title != "Dashbord") {
                                    return (
                                        <Link to={page.route} className="adminLink" key={page.title}><li>{page.title}</li></Link>
                                    );
                                }
                            })
                        }
                        <Button className="whiteBtn addBtn" text="Ny side" />
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
                                        <Link to={page.route} key={page.title} className="normalLink"><li>{page.title}</li></Link>
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