import styles from './Card.module.css';
import { PropsWithChildren, Component } from 'react';

type CardProps = {
	className?: string;
}

/**
 * A basic card component. Shows content in a little box.
 */
class Card extends Component<PropsWithChildren<CardProps>> {
	constructor(props: PropsWithChildren) {
		super(props);

		this.state = {};
	}

	render() {
		let classes = styles.card;

		if (this.props.className) classes += ' ' + this.props.className;

		return <div className={classes}>{this.props.children}</div>;
	}
}

export default Card;
