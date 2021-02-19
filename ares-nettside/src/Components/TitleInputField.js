import React, { Component } from 'react';

function saveTitle(e) {
    // !Add save logic later
    console.log(e.currentTarget.innerHTML);
}

class TitleInputField extends Component {

    render() {
        return (
            <div
                className="titleInputField"
                value={this.props.title}
                onBlur={saveTitle}
                contentEditable
                suppressContentEditableWarning={true}
            >
                {this.props.title}
            </div>
        );
    }

}

export default TitleInputField;