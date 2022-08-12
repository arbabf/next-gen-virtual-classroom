import { Component } from 'react';
import { User } from '../../entities/User';
import ChatDisplay from './ChatDisplay';
import styles from './ChatUI.module.css';

type chatUIProps = {
	/**
	 * Current user to consider
	 */
	user: User;

	/**
	 * Whether to show this component or not
	 */
	hidden?: boolean;
};

export default class chatUI extends Component<chatUIProps> {
	render() {
		let classes = styles.page;

		if (this.props.hidden === true) {
			classes += ' ' + styles.hidden;
		}

		return (
			<div className={classes}>
				<h2>Chat</h2>
				<ChatDisplay />
			</div>
		);
	}
}
