import { Component, MouseEventHandler } from 'react';
import React from 'react';
import styles from './TableContainer.module.css';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import { TableState } from '../../entities/Table';
import { testTableState, testUserList } from '../../entities/TestEntities';
import { Table } from './Table';
import { User } from '../../entities/User';

/**
 * Table Container props.
 */

type TableContainerProps = {
	showEditor?: boolean;
	tables: TableState[];
	editTableCallback: Function;
};

type TableContainerState = {
	/**
	 * Whether the editor is visible
	 */
	showEditor: boolean;

	/**
	 * Current set of tables
	 */
	tables: TableState[];

	/**
	 * Active table for editing
	 */
	activeTable: TableState;
};

export class TableContainer extends Component<TableContainerProps, TableContainerState> {
	constructor(props: TableContainerProps) {
		super(props);
		this.state = {
			showEditor: this.props.showEditor || false,
			tables: this.props.tables,
			activeTable: this.props.tables[0] || testTableState,
		};
	}

	render() {
		return (
			<div className={styles.container}>
				{this.props.tables.map((table) => (
					<Table
						key={table.info.id}
						state={table}
						toggleEditor={(_) =>
							this.setState({ showEditor: !this.state.showEditor, activeTable: table })
						}
					/>
				))}

				<div className={this.state.showEditor ? '' : styles.hidden}>
					<Card>
						<h1>Edit participants</h1>

						<ul>
							{this.state.activeTable.participants.map((participant, index) => (
								<li key={participant.id}>
									<span>{participant.name}</span>
									<Button onClick={() => this.removeUser(participant, this.state.activeTable)}>
										<span>Remove</span>
									</Button>
								</li>
							))}
						</ul>

						<ButtonSet>
							<Button onClick={() => this.addTestUsers(this.state.activeTable)}>
								<span>Add participants</span>
							</Button>
						</ButtonSet>
					</Card>
				</div>

			</div>
		);
	}

	addTestUsers(table: TableState) {
		let newTable = table;
		newTable.participants = table.participants.concat(new User("Added user"));

		this.props.editTableCallback(newTable);
	}

	removeUser(target: User, table: TableState) {
		let newTable = table;
		newTable.participants = table.participants.filter(participant => participant.id !== target.id);

		this.props.editTableCallback(newTable);
	}
}
