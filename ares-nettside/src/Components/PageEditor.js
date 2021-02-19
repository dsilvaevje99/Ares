import React, { Component } from 'react';
import TextEditor from './TextEditor';
import TitleInputField from './TitleInputField';
import Banner from './Banner';
import Button from './Button';

class PageEditor extends Component {

    render() {
        return(
            <div>
                <Banner type="warnBanner" text="Du er nå i redigeringsmodus. Husk å lagre endringer du ønsker å beholde." />
                <div className="flexBox">
                    <TitleInputField title={this.props.title} />
                    <Button className="greenBtn" text="Lagre & publiser" />
                </div>
                <TextEditor content={this.props.content} />
            </div>
        );
    }
}

export default PageEditor;