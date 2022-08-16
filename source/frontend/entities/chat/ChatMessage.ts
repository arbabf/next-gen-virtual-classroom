import { testUser, User } from "../User";

export class ChatMessage {
	id = "0";
	sender = testUser;
	message = "";

	constructor(sender: User, message: string) {
		this.sender = sender;
		this.message = message;
	}
}