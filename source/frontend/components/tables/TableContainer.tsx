import { Component } from 'react';
import { TableState } from '../../entities/Table';
import { testTableState } from '../../entities/TestEntities';
import { User } from '../../entities/User';
import { RoomUser } from '../../entities/user/RoomUser';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import { Table } from './Table';
import styles from './TableContainer.module.css';

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
	// takes props for this tableContainer and set states
	constructor(props: TableContainerProps) {
		super(props);
		this.state = {	// set states
			showEditor: this.props.showEditor || false,
			tables: this.props.tables,	// list of tables
			activeTable: this.props.tables[0] || testTableState,	// test table
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
								<li key={participant.global.id}>
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
		let newUser = new User("Added user");
		newTable.participants = table.participants.concat(new RoomUser(newUser));

		this.props.editTableCallback(newTable);
	}

	removeUser(target: RoomUser, table: TableState) {
		let newTable = table;
		newTable.participants = table.participants.filter(participant => participant.global.id !== target.global.id);

		this.props.editTableCallback(newTable);
	}
}
