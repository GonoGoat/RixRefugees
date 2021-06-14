import { render, fireEvent } from '../test-utils';
import Assignments from '../Components/Assignments';

describe('Assignments component', () => {
  test('it renders', () => {
    render(<Assignments />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})