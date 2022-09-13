import { Component, MouseEventHandler } from 'react';
import { TableState } from '../../entities/Table';
import Button from '../common/button/button';
import Icon from '../common/icon/icon';
import { UserView } from '../user/UserView';
import styles from './Table.module.css';

type TableProps = {
	/**
	 * This table's state
	 */
	state: TableState;

	/**
	 * Button function to toggle table editor
	 */
	toggleEditor?: MouseEventHandler;
};

export class Table extends Component<TableProps> {
	render() {
		return (
			<div className={styles.table}>
				<ul className={styles.participants}>
					{this.props.state.participants.map((participant) => (
						<UserView key={participant.user.id} user={participant} />
					))}
					<Button onClick={this.props.toggleEditor} unfilled>
						<Icon iconName="edit" size="1.5em" />
					</Button>
				</ul>
			</div>
		);
	}
}
