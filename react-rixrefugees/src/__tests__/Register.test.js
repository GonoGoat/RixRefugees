import { render, fireEvent } from '../test-utils';
import Register from '../Components/Register';

describe('Register component', () => {
  test('it renders', () => {
    render(<Register />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})