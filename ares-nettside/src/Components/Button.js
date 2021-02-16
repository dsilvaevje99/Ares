import React from 'react';

class Button extends React.Component {

    render() {
        return (
          <div>
              <button
                  className={'btn '+this.props.className}
                  disabled={this.props.disabled}
                  onClick={ () => this.props.onClick() }
              >
                  {this.props.text}
              </button>
          </div>
        );
    }

}

export default Button;