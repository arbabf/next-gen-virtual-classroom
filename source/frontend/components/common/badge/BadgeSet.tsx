import { Component, PropsWithChildren } from "react";
import styles from "./BadgeSet.module.css";

type BadgeSetProps = {
	className?: string;
}

export class BadgeSet extends Component<PropsWithChildren<BadgeSetProps>> {
	render() {
		let classes: string = styles.set;

		if (this.props.className) classes += ' ' + this.props.className;

		return <div className={classes}>
			{this.props.children}
		</div>
	}
}