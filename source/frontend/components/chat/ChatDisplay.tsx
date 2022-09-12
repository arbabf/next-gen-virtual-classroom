import { Component } from 'react';
import { ChatMessage as Message } from '../../entities/chat/ChatMessage';
import Card from '../common/card/card';
import { ChatMessage } from './message/ChatMessage';

type ChatDisplayProps = {
	messages: Message[];
};

export default class ChatDisplay extends Component<ChatDisplayProps> {
	static maxDepth = 3;

	render() {
		return (
			<>
				{this.props.messages.map((message) => (
					<ChatMessage key={message.id} message={message} depth={1} />
				))}
			</>
		);
	}
}
