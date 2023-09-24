import { Component } from 'react';
import './styles.css';
import P from 'prop-types';

export class Button extends Component {
  render() {
    const { text, click, disabled = false } = this.props;
    return (
      <button className="button" onClick={click} disabled={disabled}>
        {text}
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  click: P.func.isRequired,
  disabled: P.bool,
};
