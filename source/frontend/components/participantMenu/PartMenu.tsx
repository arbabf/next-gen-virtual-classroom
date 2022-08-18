import { Component } from 'react';
import { User } from '../../entities/User';
import styles from './PartMenu.module.css';
import PartSetting from './PartSetting';

type PartMenuProps = {
	/**
	 * Current user to consider
	 */
	user: User;

	/**
	 * Whether to show this component or not
	 */
	hidden?: boolean;
};

export default class PartMenu extends Component<PartMenuProps> {
	render() {
		let classes = styles.page;

		if (this.props.hidden === true) {
			classes += ' ' + styles.hidden;
		}

		return (
			<div className={classes}>
				<PartSetting />
			</div>
		);
	}
}
