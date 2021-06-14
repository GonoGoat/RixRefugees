import { render, fireEvent } from '../test-utils';
import NewPassword from '../Components/NewPassword';

describe('NewPassword component', () => {
  test('it renders', () => {
    render(<NewPassword />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})