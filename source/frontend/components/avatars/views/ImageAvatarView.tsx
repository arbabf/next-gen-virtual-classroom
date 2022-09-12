import Image from 'next/image';
import { Component } from "react";
import { ImageAvatar } from "../../../entities/avatar/image/ImageAvatar";

type ImageAvatarViewProps = {
	avatar: ImageAvatar;
}

export class ImageAvatarView extends Component<ImageAvatarViewProps> {
	render() {
		return <Image src={this.props.avatar.url} alt="User avatar" layout="fill" />;
	}
}