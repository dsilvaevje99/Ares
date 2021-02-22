import React from "react";
import Card from '../Components/Card';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import PagesJson from '../JsonData/pages.json';

const { pages } = PagesJson;

function Dashboard(props) {

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
                                                    <Link to={page.route} className="btn">
                                                        <FontAwesomeIcon icon={faPen} />
                                                        Rediger side
                                                    </Link>
                                                    <Button className="delBtn redBtn" text="Slett side" />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })
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

export default Dashboard;