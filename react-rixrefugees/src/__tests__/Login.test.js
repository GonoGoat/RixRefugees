import { render, fireEvent } from '../test-utils';
import Login from '../Components/Login';

describe('Login component', () => {
  test('it renders', () => {
    render(<Login />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})