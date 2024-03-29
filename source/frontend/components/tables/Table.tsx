import React, { Component, MouseEventHandler } from 'react';
import { TableState } from '../../entities/Table';
import { UserAction } from '../../entities/user/UserAction';
import { Badge } from '../common/badge/Badge';
import Button from '../common/button/button';
import Icon from '../common/icon/icon';
import { UserView } from '../user/UserView';
import styles from './Table.module.css';

type TableProps = {
	/**
	 * This table's state
	 */
	state?: TableState;

	/**
	 * Button function to toggle table editor
	 */
	toggleEditor?: MouseEventHandler;

	/**
	 * Whether this table is roaming space
	 */
	roaming?: boolean;

	/**
	 * Whether this table is a stage
	 */
	stage?: boolean;

	/**
	 * When click table to change
	 */
	onJoin?: MouseEventHandler;

};


export class Table extends Component<TableProps> {

	render() {
		let classes = styles.table;

		if (this.props.roaming) classes += ` ${styles.roaming}`;
		else if (this.props.stage) classes += ` ${styles.stage}`;
		else classes += ` ${styles.regular}`;

		return (
			/** Should add onclick here - change table */
			<div className={classes} onClick = {this.props.onJoin} >	
				{this.props.stage && <div className={styles.badge}>
					<Badge type={UserAction.inDiscussion} size="medium" />
				</div>}

				<div className={styles.participants}>
					{this.props.state && this.props.state.participants.map((participant) => (
						<UserView key={participant.globalInfo.id} user={participant} />
					))}
					<Button onClick={this.props.toggleEditor} unfilled>
						<Icon iconName="edit" size="1.5em" />
					</Button>
				</div>
			</div>
		);
	}

	// do onJoin

}
