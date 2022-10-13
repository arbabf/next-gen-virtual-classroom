import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ScreenContainer from '../../components/screen/screencontainer/ScreenContainer';
import { act } from 'react-dom/test-utils';

describe('ScreenContainer', () => {
	it('Includes a ScreenContainer', () => {
		render(<ScreenContainer/>);

		const containerElem = screen.getByText('Screen available');

		expect(containerElem).toBeInTheDocument();
	});

	it('Renders a panel', () => {
		render(<ScreenContainer mediaOn/>);
        const containerElem = screen.getByText('Sharing media');
        // display screen
        containerElem.click();

		const panelElem = screen.getByText('Screen');

		expect(panelElem).toBeInTheDocument();
	});

    it('Renders the correct components when Panel is not shown', () => {
		render(<ScreenContainer mediaSelectorOn mediaOn/>);
        const containerElem = screen.getByText('Sharing media');
        containerElem.click();


        const changeElem = screen.getByText('Change share');
        act(() => {
            // bring up show screen/stop sharing buttons
            changeElem.click();
        })
        
		const buttonElem = screen.getByText('Show screen')
        const otherButtomElem = screen.getByText('Stop sharing')
        const screenElem = screen.queryByText('Screen')

		expect(buttonElem).toBeInTheDocument();
        expect(otherButtomElem).toBeInTheDocument();
        // no panels on screen
        expect(screenElem).not.toBeInTheDocument();
	});

    it('Does not display ButtonSet when sharing is off', () => {
		render(<ScreenContainer mediaSelectorOn/>);
        const containerElem = screen.getByText('Screen available');
        containerElem.click();

        expect(screen.queryByText('Show screen')).not.toBeInTheDocument();
        expect(screen.queryByText('Stop sharing')).not.toBeInTheDocument();
        
	});

    it('Displays sharing buttons', () => {
		render(<ScreenContainer/>);
        const containerElem = screen.getByText('Screen available');
        containerElem.click();

        const fileElem = screen.getByText('Upload a file');
        const shareElem = screen.getByText('Share screen');
        const embedElem = screen.getByText('Embed a page');
        const whiteElem = screen.getByText('Whiteboard');
        const moreElem = screen.getByText('More media types');

		expect(fileElem).toBeInTheDocument();
        expect(shareElem).toBeInTheDocument();
        expect(embedElem).toBeInTheDocument();
        expect(whiteElem).toBeInTheDocument();
        expect(moreElem).toBeInTheDocument();
	});
});