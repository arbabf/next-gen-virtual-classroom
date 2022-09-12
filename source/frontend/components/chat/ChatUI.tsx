import { Component } from 'react';
import { ChatMessage } from '../../entities/chat/ChatMessage';
import { RoomInfo } from '../../entities/Room';
import { User } from '../../entities/User';
import { ChatAPI } from '../../lib/ChatAPI';
import ChatDisplay from './ChatDisplay';
import styles from './ChatUI.module.css';

type ChatUIProps = {
	/**
	 * Current user to consider
	 */
	user: User;

	/**
	 * room for this chat box
	 */
	room: RoomInfo;

	/**
	 * Whether to show this component or not
	 */
	hidden?: boolean;
};

type ChatUIState = {
	messages: ChatMessage[];
}

export default class ChatUI extends Component<ChatUIProps> {
	state: ChatUIState = {
		messages: []
	}

	componentDidMount() {
		this.fetchMessages();
	}

	render() {
		let classes = styles.page;

		if (this.props.hidden === true) {
			classes += ' ' + styles.hidden;
		}


		return (
			<div className={classes}>
				<h2 className={styles.header}>Chat</h2>
				<ChatDisplay messages={this.state.messages} />
			</div>
		);
	}

	fetchMessages() {
		ChatAPI.getMessages(this.props.room).then((messages) => this.setState({ messages }));
	}
}
