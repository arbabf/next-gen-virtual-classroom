import { v4 as uuidv4 } from 'uuid';
import { User } from '../User';
import { ChatRecipient } from './ChatRecipient';

/**
 * A chat message, which can be sent to a recipient. The recipient is used to determine the scope
 * of the chat message.
 * 
 * Chat message bodies are formatted as Markdown, but this formatting is restricted client-side
 * according to what the client's design allows. Currently, this is just simple text and code.
 */
export class ChatMessage {
	id: string;
	sender: User;
	recipient: ChatRecipient;
	body: string;
	timestamp: Date;
	parent?: string;

	constructor(sender: User, recipient: ChatRecipient, body: string, parentMessage?: string, id: string = uuidv4(), timestamp: Date = new Date()) {
		this.sender = sender;
		this.recipient = recipient;
		this.body = body;
		this.parent = parentMessage;
		this.id = id;
		this.timestamp = timestamp;
	}
}
