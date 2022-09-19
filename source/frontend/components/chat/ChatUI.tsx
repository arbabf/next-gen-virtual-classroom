import { Component } from 'react';
import { ChatMessage } from '../../entities/chat/ChatMessage';
import { RoomInfo } from '../../entities/Room';
import { RoomUser } from '../../entities/user/RoomUser';
import { ChatAPI } from '../../lib/ChatAPI';
import { ChatCompose } from './ChatCompose';
import ChatDisplay from './ChatDisplay';
import styles from './ChatUI.module.css';

type ChatUIProps = {
	/**
	 * Current user to consider
	 */
	user: RoomUser;

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
				<ChatCompose sender={this.props.user} room={this.props.room} onMessageSent={this.onMessageSent.bind(this)} />
			</div>
		);
	}

	fetchMessages() {
		ChatAPI.getMessages(this.props.room).then((messages) => this.setState({ messages }));
	}

	/**
	 * Callback when a message has been successfully sent to the middleware. Updates state.
	 * 
	 * @param message message that has been sent
	 */
	private onMessageSent(message: ChatMessage) {
		this.setState({ messages: [...this.state.messages, message] });
	}
}
