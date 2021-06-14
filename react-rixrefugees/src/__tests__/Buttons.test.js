import { screen } from '@testing-library/dom';

import { render, fireEvent } from '../test-utils';

import AddButton from "../Components/utils/Buttons/AddButton";
import CancelButton from "../Components/utils/Buttons/CancelButton";
import DeleteButton from "../Components/utils/Buttons/DeleteButton";
import EditButton from "../Components/utils/Buttons/EditButton";

describe('AddButton component', () => {
    test('it works on click', () => {
      const onclick = jest.fn();
      render(<AddButton  disabled={false} add={onclick}/>);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();

      fireEvent.click(button);
      expect(onclick).toHaveBeenCalledTimes(1);
    });

    test('it can be disabled', () => {
        render(<AddButton disabled={true}/>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
})

describe('CancelButton component', () => {
    test('it works on click', () => {
      const onclick = jest.fn();
      render(<CancelButton  disabled={false} cancel={onclick}/>);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();

      fireEvent.click(button);
      expect(onclick).toHaveBeenCalledTimes(1);
    });

    test('it can be disabled', () => {
        render(<CancelButton disabled={true}/>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
})

describe('DeleteButton component', () => {
    test('it works on click', () => {
      const onclick = jest.fn();
      render(<DeleteButton  disabled={false} delete={onclick}/>);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();

      fireEvent.click(button);
      expect(onclick).toHaveBeenCalledTimes(1);
    });

    test('it can be disabled', () => {
        render(<DeleteButton disabled={true}/>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
})

describe('EditButton component', () => {
    test('it works on click', () => {
      const onclick = jest.fn();
      render(<EditButton  disabled={false} edit={onclick}/>);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();

      fireEvent.click(button);
      expect(onclick).toHaveBeenCalledTimes(1);
    });

    test('it can be disabled', () => {
        render(<EditButton disabled={true}/>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
})