import assert from "assert";
import { Component } from "react";
import { ChatMessage } from "../../entities/chat/ChatMessage";
import { ChatRecipient } from "../../entities/chat/ChatRecipient";
import { RoomInfo } from "../../entities/Room";
import { RoomUser } from "../../entities/user/RoomUser";
import { ChatAPI } from "../../lib/ChatAPI";
import Button from "../common/button/button";
import Icon from "../common/icon/icon";
import styles from "./ChatCompose.module.css";

type ChatComposeProps = {
	room: RoomInfo;
	sender: RoomUser;
	onMessageSent: (message: ChatMessage) => void;
}

type ChatComposeState = {
	message: string;
	scope: ChatRecipient;
	hasError: boolean;
	currentErrorMessage: string;
}

enum ChatScope {
	room = "room",
	table = "table",
	user = "user"
}

/**
 * Compose box for the chat system.
 */
export class ChatCompose extends Component<ChatComposeProps, ChatComposeState> {
	state: ChatComposeState = {
		message: "",
		scope: this.props.room,
		hasError: false,
		currentErrorMessage: "There are no errors. You shouldn't be seeing this message."
	}

	render() {
		let errorClasses = styles.errorSpace;

		if (!this.state.hasError) errorClasses += " hidden";

		return <div className={styles.box}>
			<div className={styles.scopeSelect}>
				<label htmlFor="scope">Send to </label>
				<select onChange={this.onScopeChange.bind(this)}>
					<option value={ChatScope.room}>Classroom</option>
					<option value={ChatScope.table}>Table</option>
					<option value={ChatScope.user}>Direct Message</option>
				</select>
			</div>
			<div className={styles.composeBox}>
				<textarea value={this.state.message} onChange={this.onMessageChange.bind(this)} />
				<Button onClick={this.sendMessage.bind(this)} unfilled>
					<Icon iconName="send" />
				</Button>
			</div>
			<div className={errorClasses}>
				<Icon iconName="error" />
				<span>Error sending message: {this.state.currentErrorMessage}</span>
			</div>
		</div>
	}

	/**
	 * Handler for any change to the text area for the compose box. Every character triggers this.
	 * 
	 * @param event An event detailing the current state of the message box.
	 */
	private onMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({ message: event.target.value });
	}

	/**
	 * Handler for any change to the scope dropdown. This is triggered when the user selects a new scope.
	 * 
	 * @param event An event detailing the current state of the scope select box.
	 */
	private onScopeChange(event: React.ChangeEvent<HTMLSelectElement>) {
		assert(Object.keys(ChatScope).includes(event.target.value), "Invalid scope selected");

		let target: ChatRecipient;

		// select a recipient based on scope dropdown
		switch (event.target.value) {
			case ChatScope.room:
				target = this.props.room;
				break;

			case ChatScope.table:
				target = this.props.sender.state?.location || this.props.room.layout.roamingSpace;
				break;

			case ChatScope.user:
				target = this.props.sender;
				break;

			default:
				throw new Error("Invalid scope selected");
		}

		this.setState({ scope: target });
	}

	private sendMessage(_: React.MouseEvent<HTMLButtonElement>) {
		// get message from state
		const message = this.state.message;

		// get scope from state
		const scope = this.state.scope;

		// ensure message attrs are valid
		assert(message.length > 0, "Message must not be empty");
		assert(scope !== undefined, "Scope must be defined");
		assert(this.props.sender.global !== undefined, "Room user has no global sender data");

		// create new message
		const newMessage = new ChatMessage(this.props.sender.global, scope, message);

		// send message
		ChatAPI.sendMessage(newMessage)
			.then((sentMessage) => {
				// clear compose
				this.setState({ message: "" });

				// update parents
				this.props.onMessageSent(sentMessage);
			})
			.catch((error) => {
				this.setState({
					hasError: true,
					currentErrorMessage: error
				});
			});
	}
}