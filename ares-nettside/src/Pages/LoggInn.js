import React, { Component, useState } from 'react';
import Button from '../Components/Button';
import InputField from "../Components/InputField";
import UserStore from '../Stores/UserStore';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        if(val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin() {
        if(!this.state.username) {
            return;
        }
        if(!this.state.password) {
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if(result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.userName = result.username;
            }
            else if(result && result.success === false) {
                this.resetForm();
                document.getElementById("loginErrorContainer").innerHTML = result.msg;
            }
        } catch(e) {
            console.log(e);
            this.resetForm();
            document.getElementById("loginErrorContainer").innerHTML = "En systemfeil har oppstått. Vennligst kontakt sidens administrator.";
        }
    }

    render() {
        return (
            <div  className="pageContent">
                <div className="login-wrapper">
                    <h1>Logg inn</h1>
                    <div>
                        <label>
                            <p>Brukernavn</p>
                            <InputField
                                type="text"
                                placeholder="Brukernavn"
                                value={this.state.username ? this.state.username : ''}
                                onChange={ (val) => this.setInputValue('username', val) }
                            />
                        </label>
                        <label>
                            <p>Passord</p>
                            <InputField
                                type="password"
                                placeholder="Passord"
                                value={this.state.password ? this.state.password : ''}
                                onChange={ (val) => this.setInputValue('password', val) }
                            />
                        </label>
                        <div>
                            <Button
                                className="submitBtn"
                                text="Logg inn"
                                onClick={ () => this.doLogin() }
                                disabled={this.state.buttonDisabled}
                            />
                        </div>
                        <div id="loginErrorContainer"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;