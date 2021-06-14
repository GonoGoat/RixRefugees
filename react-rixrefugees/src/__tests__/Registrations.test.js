import { render, fireEvent } from '../test-utils';
import Registrations from '../Components/Registrations';

describe('Registrations component', () => {
  test('it renders', () => {
    render(<Registrations />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})