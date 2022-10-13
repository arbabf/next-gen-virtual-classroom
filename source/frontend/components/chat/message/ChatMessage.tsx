import assert from 'assert';
import { formatDistance } from 'date-fns';
import React, { Component, ReactNode } from "react";
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageInfo } from '../../../entities/chat/ChatMessage';
import ButtonSet from '../../common/buttonset/buttonset';
import Icon from "../../common/icon/icon";
import ChatDisplay from "../ChatDisplay";
import styles from "./ChatMessage.module.css";
import Button from '../../common/button/button';

type ChatMessageProps = {
	/**
	 * Message to display
	 */
	message: ChatMessageInfo;

	/**
	 * Maps message IDs to replies. Used to figure out recurisve replies.
	 */
	replyMap: Map<String, ChatMessageInfo[]>;

	/**
	 * Depth of this chat message
	 */
	depth: number;

	/**
	 * Callback to trigger reply focus for chat compose box
	 */
	onReplyFocus?: (message: ChatMessageInfo) => void;
}

type ChatMessageViewState = {
	/**
	 * Whether to show the replies or not. Used to change the "Show replies" button.
	 */
	showChildren: boolean;

	/**
	 * Whether the message is collapsed to just the byline.
	 */
	collapsed: boolean;
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
export class ChatMessage extends Component<ChatMessageProps, ChatMessageViewState> {
	state: ChatMessageViewState = {
		showChildren: false,
		collapsed: false
	}

	render(): ReactNode {
		let classes = styles.message;

		if (this.state.collapsed) classes += " " + styles.collapsed;
		if (!this.state.showChildren) classes += " " + styles.hideChildren;

		const message = this.props.message;
		const replies = this.props.replyMap.get(message.id);

		assert(message.sender !== undefined, "Message sender is undefined");

		return <div className={classes}>
			<div className={styles.byline} onClick={(_) => this.setState({ collapsed: !this.state.collapsed })}>
				<span className={styles.author}>{message.sender.name}</span>
				<span className={styles.time}>
					{formatDistance(message.timestamp, new Date())} ago
				</span>
				<Icon
					className={styles.expandIcon}
					iconName={this.state.collapsed ? "expand_more" : "expand_less"} />
			</div>
			<div className={styles.content}>
				<div className={styles.messageBody}>
					<ReactMarkdown allowedElements={allowedMDElements}>
						{message.body}
					</ReactMarkdown>
				</div>

				<ButtonSet className={styles.messageButtonSet}>
					{this.shouldShowReplies() && replies &&
						<Button slim inverted onClick={(_) => this.setState({ showChildren: !this.state.showChildren })}>
							<Icon
								iconName={this.state.showChildren ? "expand_less" : "expand_more"} />
							<span>{this.state.showChildren ? "Hide" : "Show"} {replies.length} {replies.length > 1 ? "replies" : "reply"}</span>
						</Button>
					}
					{this.props.onReplyFocus && this.notMaxDepth() &&
						<Button slim inverted
							onClick={
								(_) => {
									if (this.props.onReplyFocus)
										this.props.onReplyFocus(this.props.message);
								}
							}
						>
							<Icon iconName="reply" />
							<span>Reply</span>
						</Button>
					}
				</ButtonSet>

				{this.shouldShowReplies() && replies &&
					<div className={styles.children}>
						{replies.map(
							(reply) =>
								<ChatMessage key={reply.id} message={reply} replyMap={this.props.replyMap} depth={this.props.depth + 1} onReplyFocus={this.props.onReplyFocus?.bind(this)} />
						)}
					</div>
				}

			</div>
		</div >
	}

	/**
	 * Checks if this message should be rendering out its replies. Based on depth and whether there
	 * are replies to show.
	 * 
	 * @returns true if this message should show replies
	 */
	private shouldShowReplies(): boolean {
		const replies = this.props.replyMap.get(this.props.message.id);

		if (this.notMaxDepth() && replies && replies.length > 0)
			return true;
		else
			return false;
	}

	/**
	 * Checks whether this message has reached max depth.
	 * @returns true if not at max depth
	 */
	private notMaxDepth(): boolean {
		return this.props.depth <= ChatDisplay.maxDepth;
	}
}