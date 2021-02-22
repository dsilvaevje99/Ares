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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.doLogOut = this.doLogOut.bind(this);
    }

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
                /*UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.userName = result.username;*/
                this.setState({isLoggedIn: true});
            } else {
                /*
                UserStore.loading = false;
                UserStore.isLoggedIn = false;*/
                this.setState({isLoggedIn: false});
            }

        } catch(e) {
            /*UserStore.loading = false;
            UserStore.isLoggedIn = false;*/
            console.log(e);
            this.setState({isLoggedIn: false});
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
                /*UserStore.isLoggedIn = false;
                UserStore.userName = '';*/
                this.setState({isLoggedIn: false});
            } else if(result && result.success === false) {
                console.log("doLogOut() failed to log out. You may already be logged out.");
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
                        <TopBar isLoggedIn={this.state.isLoggedIn} doLogOut={this.doLogOut}/>
                        <Navigation isLoggedIn={this.state.isLoggedIn}/>
                        <Switch>
                            <Route path="/" exact component={Forsiden}/>
                            <Route path="/Priser" component={Priser}/>
                            <Route path="/LoggInn" component={LoggInn}/>
                            <PrivateRoute path="/Dashboard" component={Dashboard}/>
                        </Switch>
                    </div>
                </Router>
            );
        }

}

export default observer(App);
