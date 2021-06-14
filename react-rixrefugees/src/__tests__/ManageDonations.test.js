import { render, fireEvent } from '../test-utils';
import ManageDonations from '../Components/ManageDonations';

describe('ManageDonations component', () => {
  test('it renders', () => {
    render(<ManageDonations />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})