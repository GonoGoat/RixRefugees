import { render, fireEvent } from '../test-utils';
import PasswordReset from '../Components/PasswordReset';

describe('PasswordReset component', () => {
  test('it renders', () => {
    render(<PasswordReset />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})