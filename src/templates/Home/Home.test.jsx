import { rest } from 'msw';
import { setupServer } from 'msw/node';

import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';
const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img1.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
});

it('should render search, posts and load more', async () => {
  render(<Home />);
  const noMorePosts = screen.getByText('Não existem posts =/');

  expect.assertions(3);
  await waitForElementToBeRemoved(noMorePosts);
  // screen.debug();

  const search = screen.getByPlaceholderText(/type your search/i);
  expect(search).toBeInTheDocument();

  const images = screen.getAllByRole('img', { name: /title/i });
  expect(images).toHaveLength(3);

  const btn = screen.getByRole('button', { name: /load more posts/i });
  expect(btn).toBeInTheDocument(3);
});

it('should render for posts', async () => {
  render(<Home />);
  const noMorePosts = screen.getByText('Não existem posts =/');

  expect.assertions(8);

  await waitForElementToBeRemoved(noMorePosts);
  // screen.debug();

  const search = screen.getByPlaceholderText(/type your search/i);

  act(() => {
    userEvent.type(search, 'title1');
  });
  expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'title2' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'title3' }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Search value: title1' }),
  ).toBeInTheDocument();

  act(() => {
    userEvent.clear(search);
  });

  expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();

  expect(screen.queryByRole('heading', { name: 'title2' })).toBeInTheDocument();

  expect(screen.queryByRole('heading', { name: 'title3' })).toBeInTheDocument();

  act(() => {
    userEvent.type(search, 'ashuidhias not exist');
  });
  expect(screen.getByText('Não existem posts =/')).toBeInTheDocument();
});

it('should testing load more posts', async () => {
  render(<Home />);
  const noMorePosts = screen.getByText('Não existem posts =/');

  // expect.assertions(3);

  await waitForElementToBeRemoved(noMorePosts);

  const btn = screen.getByRole('button', { name: /load more posts/i });

  userEvent.click(btn);
  expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
  expect(btn).toBeDisabled();
});
