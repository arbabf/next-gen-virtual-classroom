import styles from './Card.module.css';
import { PropsWithChildren, Component } from 'react';

/**
 * A basic card component. Shows content in a little box.
 */
class Card extends Component<PropsWithChildren> {
	constructor(props: PropsWithChildren) {
		super(props);

		this.state = {};
	}

	render() {
		return <div className={styles.card}>{this.props.children}</div>;
	}
}

export default Card;
