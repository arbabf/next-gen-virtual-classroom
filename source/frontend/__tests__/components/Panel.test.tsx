import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Panel from '../../components/screen/panel/panel';

describe('Panel', () => {
	it('Includes a Panel', () => {
		render(<Panel label="test panel" media={false}/>);
		const panelElem = screen.getByText('test panel');
		expect(panelElem).toBeInTheDocument();
	});

	it('Can be expanded', () => {
		render(<Panel label="test panel" media={false} expandable expanded/>);
        const panelElem = screen.getByText('test panel');
		expect(panelElem).toBeInTheDocument();
	});
});