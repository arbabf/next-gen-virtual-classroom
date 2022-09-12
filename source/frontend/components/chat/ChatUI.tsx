import { Component } from 'react';
import { ChatMessage } from '../../entities/chat/ChatMessage';
import { testUser } from '../../entities/TestEntities';
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

const testMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis venenatis dui, sit amet pretium libero placerat at.\nAliquam interdum nisi ac iaculis scelerisque. Maecenas tempus, nibh eget consectetur malesuada, augue tortor volutpat arcu, a finibus nisl ante a ligula.";

let test = () => {
	let result = new ChatMessage(testUser, testMessage);
	result.reply(new ChatMessage(testUser, testMessage));
	result.reply(new ChatMessage(testUser, testMessage));
	return result;
}

export default class chatUI extends Component<chatUIProps> {
	render() {
		let classes = styles.page;

		if (this.props.hidden === true) {
			classes += ' ' + styles.hidden;
		}


		return (
			<div className={classes}>
				<h2 className={styles.header}>Chat</h2>
				<ChatDisplay messages={[test(), test()]} />
			</div>
		);
	}
}
