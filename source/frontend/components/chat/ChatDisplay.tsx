import { Component, PropsWithChildren } from 'react';
import Styles from "./ChatDisplay.module.css";

export default class ChatDisplay extends Component<PropsWithChildren> {
	static maxDepth = 3;

	render() {
		return (
			<div className={Styles.messageView}>
				{this.props.children}
			</div>
		);
	}
}
