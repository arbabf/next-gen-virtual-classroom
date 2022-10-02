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

			let log: ChatMessage[] = [];

			let bobMsg = new ChatMessage(bob, room, "Hello!");
			log.push(bobMsg, new ChatMessage(alice, room, "Hi!", bobMsg.id), new ChatMessage(george, room, "How are you?", bobMsg.id));

			let aliceMsg = new ChatMessage(alice, room, "Do we have **Markdown** support?");
			let aliceMsg_bob = new ChatMessage(bob, room, "What do you mean?", aliceMsg.id);
			let aliceMsg_bob_alice = new ChatMessage(alice, room, "If we have _italics_ and **bold** text, we probably do.", aliceMsg_bob.id);
			log.push(aliceMsg, aliceMsg_bob, aliceMsg_bob_alice);

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