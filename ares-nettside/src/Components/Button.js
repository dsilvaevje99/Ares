import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class Button extends Component {

    render() {
        return (
            <button
                className={'btn '+this.props.className}
                disabled={this.props.disabled}
                onClick={ () => this.props.onClick() }
            >
                {
                    this.props.className.includes("editBtn") && <FontAwesomeIcon icon={faEdit}/>
                }
                {this.props.text}
            </button>
        );
    }

}

export default Button;