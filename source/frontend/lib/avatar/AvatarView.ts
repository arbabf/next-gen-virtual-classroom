import { Component } from 'react';
import { Avatar } from './Avatar';

type AvatarViewProps = {
	avatar: Avatar;
};

export abstract class AvatarView extends Component<AvatarViewProps> {
	abstract avatar: Avatar;
}
