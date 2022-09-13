import { Component } from 'react';
import { RoomUser } from '../../entities/user/RoomUser';
import Button from '../common/button/button';
import styles from './PartMenu.module.css';

type PartMenuProps = {
	/**
	 * Current user to consider
	 */
	user: RoomUser;

	/**
	 * Whether to show this component or not
	 */
	hidden?: boolean;
};

export default class PartMenu extends Component<PartMenuProps> {
	render() {
		let classes = styles.page;

		if (this.props.hidden === true) {
			classes += ' ' + styles.hidden;
		}

		return (
			<div className={classes}>
				<section className={styles.section}>
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
			</div>
		);
	}
}
