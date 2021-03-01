import React, { Component } from 'react';
import PageEditor from './PageEditor';
import Button from './Button';

class PageDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleEdit: false
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        if(this.state.toggleEdit) {
            this.setState({toggleEdit: false});
        } else {
            this.setState({toggleEdit: true});
        }
    }

    render() {
        if(this.props.isLoggedIn) {
            // IF USER IS LOGGED IN AND IN EDIT MODE
            if(this.state.toggleEdit) {
                return(
                    <div className="pageContent">
                        <PageEditor title={this.props.title} content={this.props.content} toggleEdit={this.toggleEdit} />
                    </div>
                );
            // IF USER IS LOGGED IN BUT NOT IN EDIT MODE
            } else {
                return(
                    <div className="pageContent">
                        <div className="flexBox">
                            <h1>{this.props.title}</h1>
                            <p className="greyText">Sist opdatert: {this.props.lastUpdated}</p>
                            <Button className="editBtn" text="Rediger side" onClick={ () => this.toggleEdit() } />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
                    </div>
                );
            }
        // IF USER IS NOT LOGGED IN
        } else {
            return(
                <div className="pageContent">
                    <div className="flexBox">
                        <h1>{this.props.title}</h1>
                        <p className="greyText">Sist opdatert: {this.props.lastUpdated}</p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
                </div>
            );
        }
    }
}

export default PageDisplay;