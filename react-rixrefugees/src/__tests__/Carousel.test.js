import { screen } from '@testing-library/dom';

import { render, fireEvent } from '../test-utils';
import NextButton from "../Components/utils/Carousel/NextButton"
import PreviousButton from '../Components/utils/Carousel/PreviousButton';

describe('NextButton component', () => {
    test('it works on click', () => {
      const onclick = jest.fn();
      render(<NextButton onClickHandler={onclick}/>);
      fireEvent.click(screen.getByRole('button'));
      expect(onclick).toHaveBeenCalledTimes(1);
    });
})

describe('Previous component', () => {
    test('it works on click', () => {
        const onclick = jest.fn();
        render(<PreviousButton onClickHandler={onclick}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(onclick).toHaveBeenCalledTimes(1);
    });
})