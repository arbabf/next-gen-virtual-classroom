import { User } from '../User';
import { v4 as uuidv4 } from 'uuid';

export class ChatMessage {
	id: string;
	sender: User;
	body: string;
	timestamp: Date;
	replies: ChatMessage[];

	constructor(sender: User, body: string, replies: ChatMessage[] = [], id: string = uuidv4(), timestamp: Date = new Date()) {
		this.sender = sender;
		this.body = body;
		this.id = id;
		this.timestamp = timestamp;
		this.replies = replies;
	}

	reply(message: ChatMessage) {
		this.replies.push(message);
	}
}
