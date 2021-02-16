import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserStore from "./Stores/UserStore";

function PrivateRoute({ component: Component, ...rest }) {
    /*const isLoggedIn = async () => {
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
                return true;
            } else {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                return false;
            }

        } catch(e) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
            return false;
        }
    }

    let token;
    let userToken = isLoggedIn()
    userToken.then(function(result) {
        token = result;
    })*/
    //ABOVE CODE IS REAL CODE TO CHECK IF USER IS LOGGED IN
    //REMOVE COMMENTS TO ACTUALLY HAVE PRIVATE ROUTES
    let token = true; //REMOVE THIS WHEN REMOVING COMMENTS ABOVE

    return (
        <Route
            {...rest}
            render={props =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/LoggInn", state: { referer: props.location } }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;