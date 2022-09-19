import { Component, PropsWithChildren } from "react";
import styles from "./BadgeSet.module.css";

export class BadgeSet extends Component<PropsWithChildren> {
	render() {
		let classes: string = styles.set;

		return <div className={classes}>
			{this.props.children}
		</div>
	}
}