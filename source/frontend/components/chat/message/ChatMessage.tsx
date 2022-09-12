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

/**
 * Only allow a subset of HTML elements from markdown
 */
const allowedMDElements = [
	'p', 'blockquote', 'b', 'i', 'strong', 'a', 'em', 'code', 'pre', 'br', 'hr', 'ul', 'ol', 'li', 'sup', 'sub', 'u', 'strike'
]

export class ChatMessage extends Component<ChatMessageProps> {
	render(): ReactNode {
		let classes = "";

		let message = this.props.message;

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
				<details className={styles.children}>
					<summary className={styles.showHideReplies}>
						<Icon className={styles.expandIcon} iconName="expand_more" />
						<span className={styles.repliesCount}>Show {message.replies.length} replies</span>
					</summary>
					{message.replies.map(
						(reply) =>
							<ChatMessage key={reply.id} message={reply} depth={this.props.depth + 1} />
					)}
				</details>
			}
		</details>
	}
}