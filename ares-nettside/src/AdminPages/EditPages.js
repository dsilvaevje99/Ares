import React, { Component } from 'react';
import TextEditor from '../Components/TextEditor';
import TitleInputField from '../Components/TitleInputField';
import Banner from '../Components/Banner';
import PagesJson from '../JsonData/pages.json';

const { pages } = PagesJson;
let pageContent = pages[0].content;
let pageTitle = pages[0].title;

class EditPages extends Component {
    render() {
        return(
            <div className="pageContent">
                <Banner type="warnBanner" text="Du er nå i redigeringsmodus." />
                <TitleInputField title={pageTitle} />
                <TextEditor content={pageContent} />
            </div>
        );
    }
}

export default EditPages;