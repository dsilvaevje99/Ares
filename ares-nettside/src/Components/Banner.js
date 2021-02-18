import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

class Banner extends Component {

    render() {
        return (
          <div className={'banner '+this.props.type}>
              {
                  this.props.type === "warnBanner" && <FontAwesomeIcon icon={faExclamation} />
              }
              {
                  this.props.type === "errBanner" && <FontAwesomeIcon icon={faTimes} />
              }
              {
                  this.props.type === "succBanner" && <FontAwesomeIcon icon={faCheck} />
              }
              {this.props.text}
          </div>
        );
    }

}

export default Banner;