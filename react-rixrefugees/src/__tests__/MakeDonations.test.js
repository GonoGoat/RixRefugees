import { render, fireEvent } from '../test-utils';
import MakeDonations from '../Components/MakeDonations';

describe('MakeDonations component', () => {
  test('it renders', () => {
    render(<MakeDonations />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})