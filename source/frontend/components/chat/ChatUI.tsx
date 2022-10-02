import { Component } from 'react';
import { ChatMessage as ChatMessageInfo } from '../../entities/chat/ChatMessage';
import { ChatRecipient } from '../../entities/chat/ChatRecipient';
import { RoomInfo } from '../../entities/Room';
import { RoomUser } from '../../entities/user/RoomUser';
import { ChatAPI } from '../../lib/ChatAPI';
import { ChatCompose } from './ChatCompose';
import ChatDisplay from './ChatDisplay';
import styles from './ChatUI.module.css';
import { ChatMessage } from './message/ChatMessage';

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

	/**
	 * Maps IDs of messages with replies to a list of respective replies.
	 */
	messageReplies: Map<string, ChatMessageInfo[]>;

	/**
	 * Messages that aren't replying to anything
	 */
	topLevelMessages: ChatMessageInfo[];

	/**
	 * Current scope being viewed
	 */
	scope: ChatRecipient;

	/**
	 * Current reply focus
	 */
	replyFocus?: ChatMessageInfo;
}

export default class ChatUI extends Component<ChatUIProps> {
	state: ChatUIState = {
		topLevelMessages: [],
		messageReplies: new Map(),
		scope: this.props.room
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
				<ChatDisplay>
					{this.state.topLevelMessages.map(
						(message) =>
							<ChatMessage
								key={message.id}
								message={message}
								replyMap={this.state.messageReplies}
								depth={1}
								onReplyFocus={this.setReplyFocus.bind(this)} />
					)}
				</ChatDisplay>
				<ChatCompose
					sender={this.props.user}
					room={this.props.room}
					onMessageSent={this.onMessageSent.bind(this)}
					currentScope={this.state.scope}
					replyingTo={this.state.replyFocus}
					clearReplyFocus={() => this.setState({ replyFocus: undefined })}
				/>
			</div>
		);
	}

	fetchMessages() {
		ChatAPI.getMessages(this.props.room).then((messages) => {
			this.syncMessageStates(messages);
		});
	}

	/**
	 * Callback when a message has been successfully sent to the middleware. Updates state.
	 * 
	 * @param message message that has been sent
	 */
	private onMessageSent(message: ChatMessageInfo) {
		// update reply map
		if (message.parent) {
			const replies = this.state.messageReplies.get(message.parent);
			if (replies) {
				replies.push(message);
				this.state.messageReplies.set(message.parent, replies);
			}
			else this.state.messageReplies.set(message.parent, [message]);
		}
		else this.state.topLevelMessages.push(message);

		// clear the reply focus
		this.setState({ replyFocus: undefined });
	}

	/**
	 * Constructs the reply map by going through each message and adding it to the map if it has a
	 * parent.
	 * 
	 * @param messages list of messages that need to be inserted into state
	 */
	private syncMessageStates(messages: ChatMessageInfo[]) {
		const topLevelMessages = [];
		const messageReplies: Map<String, ChatMessageInfo[]> = new Map();

		for (const message of messages) {
			if (message.parent) {
				// get reply list
				const replies = messageReplies.get(message.parent);

				// add to replies but not if it's already there
				if (replies && replies.find((msg) => msg.id === message.id) === undefined) {
					replies.push(message);
					messageReplies.set(message.parent, replies);
				}
				else messageReplies.set(message.parent, [message]);
			}
			else if (topLevelMessages.find((msg) => msg.id === message.id) === undefined)
				topLevelMessages.push(message);
		}

		this.setState({ messageReplies, topLevelMessages });
	}

	/**
	 * Call back to set reply focus on the calling message.
	 * 
	 * @param message message to set reply focus to
	 */
	private setReplyFocus(message: ChatMessageInfo) {
		this.setState({ replyFocus: message });
	}
}
