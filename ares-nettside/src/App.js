import React, { Component } from 'react';
import './App.css';
import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { observer } from 'mobx-react';
import UserStore from './Stores/UserStore';
import PagesJson from './JsonData/pages.json';
// IMPORT PUBLIC COMPONENTS
import TopBar from './Components/TopBar';
import Navigation from './Components/Nav';
import PageDisplay from './Components/PageDisplay';
// IMPORT PRIVATE COMPONENTS & PAGES
import Dashboard from './AdminPages/Dashboard';

const { pages } = PagesJson;

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
                this.setState({isLoggedIn: true}); //! SET TO FALSE LATER TO TURN OFF AUTO-LOGIN
            }

        } catch(e) {
            /*UserStore.loading = false;
            UserStore.isLoggedIn = false;*/
            console.log(e);
            this.setState({isLoggedIn: true}); //! SET TO FALSE LATER TO TURN OFF AUTO-LOGIN
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
                            {
                                pages.map(function(page, index){
                                    if(!page.private) {
                                        return (
                                            <Route
                                                key={index}
                                                path={page.route}
                                                exact
                                                render={(props) => (
                                                    <PageDisplay {...props} isLoggedIn={this.state.isLoggedIn} title={page.title} lastUpdated={page.lastUpdated} content={page.content} />
                                                )}
                                            />
                                        );
                                    }
                                    return null;
                                }, this)
                            }
                            <PrivateRoute path="/Dashboard" component={Dashboard}/>
                        </Switch>
                    </div>
                </Router>
            );
        }

}

export default observer(App);
