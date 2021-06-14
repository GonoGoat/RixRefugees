import { render, fireEvent } from '../test-utils';
import UserAssignments from '../Components/UserAssignments';

describe('UserAssignments component', () => {
  test('it renders', () => {
    render(<UserAssignments />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})