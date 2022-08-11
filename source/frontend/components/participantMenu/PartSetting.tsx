import { Component } from 'react';
import Button from '../common/button/button';
import Card from '../common/card/card';

export default class AppSettings extends Component {
    render() {
		return (
			<>
				<section>

                <Button unfilled>
                <span>Direct Message</span>
                </Button>

                <Button unfilled>
                <span>Add Friend</span>
                </Button>

                <Button unfilled>
                <span>Invite To Table</span>
                </Button>

                <Button unfilled>
                <span>See Profile</span>
                </Button>

				</section>

			</>
		)
	}
}