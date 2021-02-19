import React, { Component, useState } from 'react';
import './App.css';
import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { observer } from 'mobx-react';
import UserStore from './Stores/UserStore';
// IMPORT PUBLIC COMPONENTS & PAGES
import TopBar from './Components/TopBar';
import Navigation from './Components/Nav';
import Forsiden from './Pages/Forsiden';
import Priser from './Pages/Priser';
import LoggInn from './Pages/LoggInn';
// IMPORT PRIVATE COMPONENTS & PAGES
import Dashboard from './AdminPages/Dashboard';
import PageEditor from './Components/PageEditor';

class App extends React.Component {

    async componentDidMount() {
        try {
            let res = await fetch('/isLoggedIn', {
               method: 'post',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               }
            });

            let result = await res.json();

            if(result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.userName = result.username;
            } else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }

        } catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
        }
    }

    async doLogOut() {
        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();

            if(result && result.success) {
                UserStore.isLoggedIn = false;
                UserStore.userName = '';
            }

        } catch(e) {
            console.log(e);
        }
    }

  render() {

        if(UserStore.loading) {
            return (
                <p>Laster inn...</p>
            );
        }

            return (
                <Router>
                    <div className="pageContainer">
                        <TopBar doLogOut={this.doLogOut()}/>
                        <Navigation/>
                        <Switch>
                            <Route path="/" exact component={Forsiden}/>
                            <Route path="/Priser" component={Priser}/>
                            <Route path="/LoggInn" component={LoggInn}/>
                            <PrivateRoute path="/Dashboard" component={Dashboard}/>
                            <PrivateRoute path="/PageEditor" component={PageEditor}/>
                        </Switch>
                    </div>
                </Router>
            );
        }

}

export default observer(App);
