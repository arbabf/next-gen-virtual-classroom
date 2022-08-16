import { Component } from 'react';
import Card from '../common/card/card';
import { ChatMessage as Message } from '../../entities/chat/ChatMessage';

type ChatDisplayProps = {
	messages: Message[];
}

export default class ChatDisplay extends Component<ChatDisplayProps> {
	render() {
		return (
			<>
				{this.props.messages.map((message) => (
					<Card key={message.id}>
						<p>{message.sender.name}</p>
						<p>{message.message}</p>
					</Card>
				))}
				<section>
					<p>John Smith:</p>
					<Card>Hello World</Card>

				</section>

			</>
		)
	}
}