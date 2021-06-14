import { render, fireEvent } from '../test-utils';
import About from '../Components/About';

describe('About component', () => {
  test('it renders', () => {
    render(<About />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})