import { Component, ReactNode } from "react";
import { Avatar } from "../../entities/avatar/Avatar";
import styles from "./AvatarView.module.css";
import { ImageAvatar } from "../../entities/avatar/image/ImageAvatar";
import { ImageAvatarView } from "./views/ImageAvatarView";
import { AvatarShape } from "../../entities/avatar/AvatarShape";

export type AvatarViewProps = {
	avatar: Avatar;

	/**
	 * Whether this is speaking
	 */
	speaking?: boolean;
};

export class AvatarView extends Component<AvatarViewProps> {
	render(): ReactNode {
		let classes = styles.frame;

		if (this.props.speaking) classes += ' ' + styles.speaking;
		if (this.props.avatar.shape === AvatarShape.CIRCLE) classes += ' ' + styles.circle;

		return <div className={classes}>
			{this.props.avatar instanceof ImageAvatar && <ImageAvatarView avatar={this.props.avatar} />}
		</div>
	}
}