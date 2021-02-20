import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

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
                data-tip="Trykk for å redigere side-tittelen"
                data-effect="solid"
                data-offset="{'left': 100}"
            >
                {this.props.title}
                <ReactTooltip />
            </div>
        );
    }

}

export default TitleInputField;