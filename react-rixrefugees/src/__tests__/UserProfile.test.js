import { render, fireEvent } from '../test-utils';
import UserProfile from '../Components/UserProfile';

describe('UserProfile component', () => {
  test('it renders', () => {
    render(<UserProfile />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})