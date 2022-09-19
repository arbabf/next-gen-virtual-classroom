import { Component, PropsWithChildren } from "react";
import { UserAction } from "../../../entities/user/UserAction";
import Icon from "../icon/icon";
import styles from "./Badge.module.css";
import { BadgeAlertTypes, BadgeUserTypes } from "./BadgeTypes";

type BadgeProps = {
	/**
	 * Size of the badge
	 */
	size?: "small" | "medium" | "large";

	/**
	 * Type of badge
	 */
	type: BadgeUserTypes | BadgeAlertTypes | UserAction;

	/**
	 * If in a badge set (thus folding together)
	 */
	inSet?: boolean;

	className?: string;
}

/**
 * Represents a small icon that notifies user of some kind of attribute.
 * 
 * An example would be the use of a screen, showing a presenting badge.
 */
export class Badge extends Component<PropsWithChildren<BadgeProps>> {
	render() {
		let classes: string = styles.badge;

		// set classes according to props
		switch (this.props.size) {
			case "medium":
				classes += ` ${styles.medium}`;
				break;
			case "large":
				classes += ` ${styles.large}`;
				break;

			default:
				classes += ` ${styles.small}`;
				break;
		}

		let iconName: string;

		switch (this.props.type) {
			case UserAction.presenting:
				iconName = "present_to_all";
				break;

			case UserAction.announcing:
				iconName = "campaign";
				break;

			case UserAction.inDiscussion:
				iconName = "group";
				break;

			case "muted":
				iconName = "mic_off";
				break;

			case "you":
				iconName = "face";
				break;

			case "host":
				iconName = "local_police";
				break;

			case "facilitator":
				iconName = "shield";
				break;

			default:
				iconName = "error";
				break;
		}

		if (this.props.type in BadgeUserTypes) classes += ` ${styles.user}`;
		else if (this.props.type in BadgeAlertTypes) classes += ` ${styles.alert}`;
		else if (this.props.type in UserAction) classes += ` ${styles.action}`;

		if (this.props.className) classes += ` ${this.props.className}`;
		if (this.props.inSet) classes += ` ${styles.inSet}`;

		return <div className={classes}>
			<Icon iconName={iconName} />
		</div>
	}
}