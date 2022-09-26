import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from '../../components/common/button/button';
import * as Strings from '../utils/strings';
import Icon from '../../components/common/icon/icon';

describe('Button', () => {
	it('Includes a <button>', () => {
		render(<Button />);

		const buttonElem = screen.getByRole('button');

		expect(buttonElem).toBeInTheDocument();
	});

	it('Can render text inside of it', () => {
		const text = `Example text full of surprises: ${Strings.contentText}`;

		render(<Button>{text}</Button>);

		const buttonElem = screen.getByRole('button');

		expect(buttonElem).toHaveTextContent(text);
	});

	it('Shows named icons correctly', () => {
		const icon = <Icon iconName={Strings.iconName} />;
		render(<Button>{icon}</Button>);

		const iconElem = screen.getByRole('button').children[0];
		expect(iconElem).toHaveTextContent(Strings.iconName);
	});
});
