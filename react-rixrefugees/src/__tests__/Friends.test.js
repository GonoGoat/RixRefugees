import { render, fireEvent } from '../test-utils';
import Friends from '../Components/Friends';

describe('Friends component', () => {
  test('it renders', () => {
    render(<Friends />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})