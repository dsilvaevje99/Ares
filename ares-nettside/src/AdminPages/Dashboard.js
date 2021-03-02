import React, { Component } from "react";
import Card from '../Components/Card';
import Button from '../Components/Button';
import PagesJson from '../JsonData/pages.json';

const { pages } = PagesJson;

class Dashboard extends Component {

    constructor(props, context){
        super(props, context);
        this.path = this.editPage.bind(this);
    }

    editPage = (path) => {
        window.location = path+'?editPage=true';
    };

    render() {
        return (
            <div className="pageContent">
                <h1>Admin dashbord</h1>
                <div id="adminGrid">
                    <h3>Sideoversikt</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Side</th>
                                <th>Sist oppdatert</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                pages.map(function(page){
                                    if(!page.private) {
                                        return (
                                            <tr className="tableRow" key={page.title}>
                                                <td>{page.title}</td>
                                                <td>{page.lastUpdate}</td>
                                                <td>
                                                    <div className="flexBox flexEnd">
                                                        <Button
                                                            className="editBtn"
                                                            text="Rediger side"
                                                            onClick={ () => this.editPage(page.route) }
                                                        />
                                                        <Button className="delBtn redBtn" text="Slett side" />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                }, this)
                            }
                        </tbody>
                    </table>
                    <h3>Tips og triks</h3>
                    <Card title="Test" content="Testing card" readMorePath="Priser" />
                    <Card title="Test2" content="Testing card 2" readMorePath="Priser" />
                    <Card title="Test3" content="Testing card 3" readMorePath="Priser" />
                </div>
            </div>
        );
    }
}

export default Dashboard;