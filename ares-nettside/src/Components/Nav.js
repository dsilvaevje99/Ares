import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserStore from '../Stores/UserStore';
import PagesJson from '../JsonData/pages.json';

const isLoggedIn = UserStore.isLoggedIn;

class Nav extends React.Component {
    render() {

        //const { pages } = PagesJson;

        if(isLoggedIn) {
            return (
                <Nav id="adminNav">
                    <ul>
                        {/*
                            Object.keys(pages).map((e, i) => {
                                <Link to={e.route} className="adminLink"><li>{e.title}</li></Link>
                            })
                        */}
                        {/*arr.map(item => <Link to={item.route} className="adminLink"><li>{item.title}</li></Link>)*/}
                    </ul>
                </Nav>
            );
        } else {
            return (
                <Nav>
                    <ul>
                        {/*arr.map(item => <Link to={item.route}><li>{item.title}</li></Link>)*/}
                    </ul>
                </Nav>
            );
        }

    }
}

export default Nav;