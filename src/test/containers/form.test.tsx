import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form } from '../../containers/form';
import '@testing-library/jest-dom/extend-expect';


describe('form', () => {

    const alert = window.alert;
    beforeAll(() => {
        window.alert = jest.fn()
    });
    afterAll(() => {
        window.alert = alert;
    });

    it('should show text content in the form', () => {
        const { getByText } = render(<Form/>);
        const titleElement = getByText(/Fill to show your username:/i);
        const inputElement = getByText(/Input username:/i);

        expect(titleElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });

    it('should show alert when submit button click', async () => {
        const { getByTestId } = render(<Form/>);
        fireEvent.submit(getByTestId("form"));
        expect(window.alert).toBeCalledWith('My name is: ');
    });
});
