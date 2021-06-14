import { render, fireEvent } from '../test-utils';
import App from '../App';

describe('App component', () => {
  test('it renders', () => {
    render(<App />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})
