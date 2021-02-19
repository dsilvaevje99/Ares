import React, { Component } from 'react';
import PageEditor from '../Components/PageEditor';
import UserStore from '../Stores/UserStore';
import PagesJson from '../JsonData/pages.json';

const isLoggedIn = UserStore.isLoggedIn;
const { pages } = PagesJson;
let pageContent = pages[1].content;
let pageTitle = pages[1].title;

const Priser = () => {
    if(isLoggedIn) {
        return (
            <div className="pageContent">
                <PageEditor title={pageTitle} content={pageContent} />
            </div>
        );
    }

    return (
        <div className="pageContent">
            <h1>{pageTitle}</h1>
            {pageContent}
        </div>
    );
};

export default Priser;