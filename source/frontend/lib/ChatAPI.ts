import { ChatMessage } from "../entities/chat/ChatMessage";
import { RoomInfo } from "../entities/Room";
import { User } from "../entities/User";

export class ChatAPI {
	static async getMessages(room: RoomInfo): Promise<ChatMessage[]> {
		return new Promise((resolve, reject) => {
			// do fetch

			// check response

			// resolve or reject

			// dummy chat log
			let bob = new User("Bob");
			let alice = new User("Alice");
			let george = new User("George");

			let log = [
				new ChatMessage(bob, room, "Hello!", [
					new ChatMessage(alice, room, "Hi!"),
					new ChatMessage(george, room, "How are you?")
				]),
				new ChatMessage(alice, room, "Do we have **Markdown** support?", [
					new ChatMessage(bob, room, "What do you mean?", [
						new ChatMessage(alice, room, "If we have _italics_ and **bold** text, we probably do."),
					]),
				]),
				new ChatMessage(george, room, "Here's the link to the [GitHub repo](https://github.com/arbabf/next-gen-virtual-classroom)"),
			];

			resolve(log);
		});
	}

	/**
	 * Sends a message to the middleware
	 * 
	 * @param message The message to send
	 * @returns The message that was sent, altered if server changes it
	 */
	static async sendMessage(message: ChatMessage): Promise<ChatMessage> {
		return new Promise((resolve, reject) => {
			// do fetch

			// check response

			// resolve or reject
			resolve(message);
		});
	}

}