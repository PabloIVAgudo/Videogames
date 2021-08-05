import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders "Henry Videogames" ', () => {
  render(<App />);
  const linkElement = screen.getByText("Henry Videogames");
  expect(linkElement).toBeInTheDocument();
});
