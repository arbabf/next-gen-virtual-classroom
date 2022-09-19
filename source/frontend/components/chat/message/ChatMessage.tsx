import assert from 'assert';
import { formatDistance } from 'date-fns';
import { Component, ReactNode } from "react";
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageInfo } from "../../../entities/chat/ChatMessage";
import Icon from "../../common/icon/icon";
import ChatDisplay from "../ChatDisplay";
import styles from "./ChatMessage.module.css";

type ChatMessageProps = {
	/**
	 * Message to display
	 */
	message: ChatMessageInfo;

	/**
	 * Depth of this chat message
	 */
	depth: number;
}

type ChatMessageState = {
	/**
	 * Whether to show the replies or not. Used to change the "Show replies" button.
	 */
	showChildren: boolean;
}

/**
 * Only allow a subset of HTML elements from markdown
 */
const allowedMDElements = [
	'p', 'blockquote', 'b', 'i', 'strong', 'a', 'em', 'code', 'pre', 'br', 'hr', 'ul', 'ol', 'li', 'sup', 'sub', 'u', 'strike'
]

/**
 * Renders a chat message.
 */
export class ChatMessage extends Component<ChatMessageProps, ChatMessageState> {
	state: ChatMessageState = {
		showChildren: false
	}

	render(): ReactNode {
		let classes = "";

		let message = this.props.message;

		assert(message.sender !== undefined, "Message sender is undefined");

		return <details className={styles.message} open>
			<summary className={styles.byline}>
				<span className={styles.author}>{message.sender.name}</span>
				<span className={styles.time}>
					{formatDistance(message.timestamp, new Date())} ago
				</span>
				<Icon className={styles.expandIcon} iconName="expand_more" />
			</summary>

			<div className={styles.messageBody}>
				<ReactMarkdown allowedElements={allowedMDElements}>
					{message.body}
				</ReactMarkdown>
			</div>

			{this.props.depth <= ChatDisplay.maxDepth && message.replies.length > 0 &&
				<details className={styles.children} onClick={this.onShowHideRepliesClick.bind(this)}>
					<summary className={styles.showHideReplies}>
						<Icon className={styles.expandIcon} iconName="expand_more" />
						<span className={styles.repliesCount}>{this.state.showChildren ? "Hide" : "Show"} {message.replies.length} {message.replies.length > 1 ? "replies" : "reply"}</span>
					</summary>
					{message.replies.map(
						(reply) =>
							<ChatMessage key={reply.id} message={reply} depth={this.props.depth + 1} />
					)}
				</details>
			}
		</details>
	}

	/**
	 * Synchronises the "show/hide" message with the state of displaying replies.
	 * 
	 * @param event produced when clicking show/hide replies
	 */
	private onShowHideRepliesClick(event: React.MouseEvent<HTMLDetailsElement, MouseEvent>) {
		this.setState({ showChildren: !event.currentTarget.open });
	}
}