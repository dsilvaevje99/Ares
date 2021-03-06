import React, { Component } from 'react';
import './App.css';
import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { observer } from 'mobx-react';
import PagesJson from './JsonData/pages.json';
// IMPORT PUBLIC COMPONENTS
import TopBar from './Components/TopBar';
import Navigation from './Components/Nav';
import PageDisplay from './Components/PageDisplay';
import Login from './Pages/LoggInn';
// IMPORT PRIVATE COMPONENTS & PAGES
import Dashboard from './AdminPages/Dashboard';

const { pages } = PagesJson;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            pageList: pages
        };
        this.doLogOut = this.doLogOut.bind(this);
        console.log("ORIGINAL STATE: \n"+this.state.pageList);
    }

    async componentDidMount() {
        // CHeck if user is logged in
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
                this.setState({isLoggedIn: true});
            } else {
                this.setState({isLoggedIn: true}); //! SET TO FALSE LATER TO TURN OFF AUTO-LOGIN
            }

        } catch(e) {
            console.log(e);
            this.setState({isLoggedIn: true}); //! SET TO FALSE LATER TO TURN OFF AUTO-LOGIN
        }

        // Get list of pages and their content
        try {
            let dbPages = await fetch('/pageList', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let dbPageList = await dbPages.json();

            if(!dbPageList.success) {
                console.log("FAILED page list: "+dbPageList);
            } else {
                this.setState({pageList: dbPageList.pages});
            }
        } catch(e) {
            console.log(e);
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
                this.setState({isLoggedIn: false});
            } else if(result && result.success === false) {
                console.log("doLogOut() failed to log out. You may already be logged out.");
            }

        } catch(e) {
            console.log(e);
        }
    }

  render() {
            return (
                <Router>
                    <div className="pageContainer">
                        <TopBar isLoggedIn={this.state.isLoggedIn} doLogOut={this.doLogOut}/>
                        <Navigation isLoggedIn={this.state.isLoggedIn} pageList={this.state.pageList} />
                        <Switch>
                            {
                                this.state.pageList.map(function(page, index){
                                    //if(page.private === 0) {
                                        return (
                                            <Route
                                                key={index}
                                                path={page.route}
                                                exact
                                                render={(props) => (
                                                    <PageDisplay
                                                        {...props}
                                                        isLoggedIn={this.state.isLoggedIn}
                                                        title={page.title}
                                                        lastUpdated={page.lastUpdated}
                                                        content={page.content}
                                                    />
                                                )}
                                            />
                                        );
                                    //}
                                    //return null;
                                }, this)
                            }
                            <Route path="/LoggInn" component={Login} exact />
                            <PrivateRoute path="/Dashboard" component={Dashboard} />
                        </Switch>
                    </div>
                </Router>
            );
        }

}

export default observer(App);
