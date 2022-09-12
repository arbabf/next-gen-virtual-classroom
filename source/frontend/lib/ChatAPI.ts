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
				new ChatMessage(bob, "Hello!", [
					new ChatMessage(alice, "Hi!"),
					new ChatMessage(george, "How are you?")
				]),
				new ChatMessage(alice, "Do we have **Markdown** support?", [
					new ChatMessage(bob, "What do you mean?", [
						new ChatMessage(alice, "If we have _italics_ and **bold** text, we probably do."),
					]),
				]),
				new ChatMessage(george, "Here's the link to the [GitHub repo](https://github.com/arbabf/next-gen-virtual-classroom)"),
			];

			resolve(log);
		});
	}
}