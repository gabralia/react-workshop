import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '../../components/input';
import '@testing-library/jest-dom/extend-expect';


describe('input', () => {
    it('should return text input when pass type is text', () => {
        const handleChange = jest.fn(() => {});
        const { getByLabelText } = render(<Input type='text' handleChange={handleChange} value="fake-value"/>);
        const inputElement = getByLabelText('input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.value).toBe('fake-value');
    });

    it('should return submit input when pass type is submit', () => {
        const { getByLabelText } = render(<Input type='submit'/>);
        const inputElement = getByLabelText('submit');
        expect(inputElement).toBeInTheDocument();
    });
});
