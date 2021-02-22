import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {

    render() {
        return (
            <div className="cardContainer">
                <h3>{this.props.title}</h3>
                <p>{this.props.content}</p>
                {
                    this.props.readMorePath != null && <Link to={this.props.readMorePath}>Les mer &gt;</Link>
                }
            </div>
        );
    }

}

export default Card;