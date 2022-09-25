import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from '../components/common/button/button';
import { difficultText } from './utils/strings';

describe('Button', () => {
	it('Includes a <button>', () => {
		render(<Button />);

		const buttonElem = screen.getByRole('button');

		expect(buttonElem).toBeInTheDocument();
	});

	it('Can render text inside of it', () => {
		const text = `Example text full of surprises: ${difficultText}`;

		render(<Button>{text}</Button>);

		const buttonElem = screen.getByRole('button');

		expect(buttonElem).toHaveTextContent(text);
	});

});
