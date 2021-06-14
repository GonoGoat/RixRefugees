import { screen } from '@testing-library/dom';

import { render, fireEvent } from '../test-utils';
import LoadingIndicator from "../Components/utils/LoadingIndicator";
import CustomDivider from "../Components/utils/CustomDivider";
import NewLineText from "../utils/NewLineText";

describe('LoadingIndicator component', () => {
  test('it renders', () => {
    render(<LoadingIndicator />)
    /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
    expect(linkElement).toBeInTheDocument();*/
  });
})

describe('CustomDivider component', () => {
    test('it renders', () => {
      render(<CustomDivider />)
      /*const linkElement = screen.getByText(/Voulez-vous faire un don à l'association ?/i);
      expect(linkElement).toBeInTheDocument();*/
    });
})

describe('NewLineText component', () => {
    test('it renders', () => {
      const text = 'ceci est un test'
      render(<NewLineText text={text}/>)
      const linkElement = screen.getByText(text);
      expect(linkElement).toBeInTheDocument();
    });

    test('it renders with an empty param', () => {
        render(<NewLineText text={''}/>)
    });
})