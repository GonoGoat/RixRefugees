import { render, fireEvent } from '../test-utils';
import Places from '../Components/Places';

describe('Places component', () => {
  test('it renders', () => {
    render(<Places />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})