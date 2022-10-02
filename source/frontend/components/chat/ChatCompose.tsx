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

	/**
	 * What the current ChatUI's focus is currently on. This sets the scope.
	 */
	currentScope: ChatRecipient;

	/**
	 * The message being replied to (if applicable)
	 */
	replyingTo?: ChatMessage;

	/**
	 * Clears message reply focus
	 */
	clearReplyFocus: () => void;
}

type ChatComposeState = {
	message: string;
	scope: ChatRecipient;
	hasError: boolean;
	currentErrorMessage: string;
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
			{this.props.replyingTo &&
				<Button className={styles.replyStatusBox} light slim onClick={(_) => this.props.clearReplyFocus()}>
					<Icon iconName="reply"
						size="1.25em" />
					<span>Replying to {this.props.replyingTo?.sender.name}</span>
					<Icon
						iconName="close"
						size="1.25em"
					/>
				</Button>
			}

			<div className={styles.composeBox}>
				<textarea value={this.state.message} onChange={this.onMessageChange.bind(this)} />
				<Button onClick={this.sendMessage.bind(this)} unfilled slim>
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

	private sendMessage(_: React.MouseEvent<HTMLButtonElement>) {
		// get message from state
		const message = this.state.message;

		// get scope from state
		const scope = this.state.scope;

		// ensure message attrs are valid
		assert(message.length > 0, "Message must not be empty");
		assert(scope !== undefined, "Scope must be defined");
		assert(this.props.sender.globalInfo !== undefined, "Room user has no global sender data");

		// create new message
		const newMessage = new ChatMessage(this.props.sender.globalInfo, scope, message);

		// add reply info
		if (this.props.replyingTo) newMessage.parent = this.props.replyingTo.id;

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