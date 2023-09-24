import './styles.css';
import P from 'prop-types';

export const TextInput = ({ inputValue, handleChange }) => {
  return (
    <input
      className="text-input"
      placeholder="Type your search"
      onChange={(e) => handleChange(e)}
      type="search"
      value={inputValue}
    />
  );
};

TextInput.propTypes = {
  inputValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
