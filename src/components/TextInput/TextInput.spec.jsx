import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of inputValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} inputValue={'testing...'} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testing...');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} inputValue={'other value'} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'the value';

    userEvent.type(input, value);
    // eslint-disable-next-line
    // screen.debug(input);

    expect(input.value).toBe('other value');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} inputValue={'testing...'} />);

    expect(container).toMatchSnapshot();
  });
});
