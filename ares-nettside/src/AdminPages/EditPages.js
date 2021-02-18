import React, { Component } from 'react';
import TextEditor from '../Components/TextEditor';
import PagesJson from '../JsonData/pages.json';

const { pages } = PagesJson;
let pageContent = pages[0].content;
let pageTitle = pages[0].title;

class EditPages extends Component {
    render() {
        return(
            <div className="pageContent">
                <h1>Rediger {pageTitle}</h1>
                <TextEditor content={pageContent} />
            </div>
        );
    }
}

export default EditPages;