import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserStore from '../Stores/UserStore';
import PagesJson from '../JsonData/pages.json';

const isLoggedIn = UserStore.isLoggedIn;
const { pages } = PagesJson;

class Nav extends React.Component {
    render() {

        if(isLoggedIn) {
            return (
                <nav id="adminNav">
                    <ul>
                        {
                            pages.map(function(page, index){
                                return (
                                    <Link to={page.route} className="adminLink"><li>{page.title}</li></Link>
                                );
                            })
                        }
                    </ul>
                </nav>
            );
        } else {
            return (

                <nav>
                    <ul>
                        {
                            pages.map(function(page, index){
                                if(!page.private) {
                                    return (
                                        <Link to={page.route}><li>{page.title}</li></Link>
                                    );
                                }
                            })
                        }
                    </ul>
                </nav>
    
            );
        }

    }
}

export default Nav;