import { User } from '../User';
import { v4 as uuidv4 } from 'uuid';

export class ChatMessage {
	id: string;
	sender: User;
	message: string;

	constructor(sender: User, message: string, id: string = uuidv4()) {
		this.sender = sender;
		this.message = message;
		this.id = id;
	}
}
