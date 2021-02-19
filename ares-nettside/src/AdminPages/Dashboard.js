import React from "react";
import Button from '../Components/Button';
import PagesJson from '../JsonData/pages.json';

const { pages } = PagesJson;

function Dashboard(props) {

    return (
        <div className="pageContent">
            <h1>Admin dashbord</h1>
            <div id="adminGrid">
                {
                    pages.map(function(page){
                        if(!page.private) {
                            return (
                                <Button
                                    className="editBtn"
                                    text={'Rediger '+page.title}
                                />
                            );
                        }
                        return null;
                    })
                }
                                
            </div>
        </div>
    );
}

export default Dashboard;