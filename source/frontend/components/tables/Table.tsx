import { Component, MouseEventHandler } from 'react';
import { TableState } from '../../entities/Table';
import Button from '../common/button/button';
import Icon from '../common/icon/icon';
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
						<li key={participant.id}>
							<Icon iconName="person" size="4em" />
						</li>
					))}
					<Button onClick={this.props.toggleEditor} unfilled>
						<Icon iconName="edit" size="1.5em" />
					</Button>
				</ul>
			</div>
		);
	}
}
