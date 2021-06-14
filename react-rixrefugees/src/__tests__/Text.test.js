import { render, fireEvent } from '../test-utils';
import {screen} from "@testing-library/react";
import { Join,Legals,Usage,Privacy,Error } from '../Components';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux'
import Store from '../redux/configureStore'

describe('Error component', () => {
  test('it renders', () => {
    render(<Error />);
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
});

describe('Join component', () => {
  test('it renders', () => {
    render(<Join />);
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
});

describe('Usage component', () => {
  test('it renders', () => {
    render(<Usage />);
  });
});

describe('Legals component', () => {
  test('it renders', () => {
    render(<Legals />);
  });
});

describe('Privacy component', () => {
  test('it renders', () => {
    render(<Privacy />);
  });
});



