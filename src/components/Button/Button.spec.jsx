// eslint-disable-no-undef
import { render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    const fn = jest.fn();
    render(<Button text="Load more" click={fn} />);

    expect.assertions(1);

    const btn = screen.getByRole('button', { name: /load more/i });
    expect(btn).toHaveAttribute('class', 'button');
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load more" click={fn} />);

    const btn = screen.getByRole('button', { name: /load more/i });
    userEvent.click(btn);
    expect(fn).toHaveBeenCalled();
  });

  it('should be disabled when is true', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={true} click={fn} />);

    const btn = screen.getByRole('button', { name: /load more/i });

    expect(btn).toBeDisabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load more" disabled={true} click={fn} />);

    expect(container).toMatchSnapshot();
  });
});
