import { Component } from 'react';
import { ChatMessage as Message } from '../../entities/chat/ChatMessage';
import { ChatMessage } from './message/ChatMessage';
import Styles from "./ChatDisplay.module.css";

type ChatDisplayProps = {
	messages: Message[];
};

export default class ChatDisplay extends Component<ChatDisplayProps> {
	static maxDepth = 3;

	render() {
		return (
			<div className={Styles.messageView}>
				{this.props.messages.map((message) => (
					<ChatMessage key={message.id} message={message} depth={1} />
				))}
			</div>
		);
	}
}
