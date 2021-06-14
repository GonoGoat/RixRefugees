import { render, fireEvent } from '../test-utils';
import SessionsTasks from '../Components/SessionsTasks';

describe('SessionsTasks component', () => {
  test('it renders', () => {
    render(<SessionsTasks />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})