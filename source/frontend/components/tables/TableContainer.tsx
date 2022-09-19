import { Component } from 'react';
import { TableInfo, TableState } from '../../entities/Table';
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
	tables: TableInfo[];
	editTableCallback: Function;
};

type TableContainerState = {
	/**
	 * Whether the editor is visible
	 */
	showEditor: boolean;

	/**
	 * Active table for editing
	 */
	activeTable: TableInfo;
};

export class TableContainer extends Component<TableContainerProps, TableContainerState> {
	// takes props for this tableContainer and set states
	constructor(props: TableContainerProps) {
		super(props);
		this.state = {	// set states
			showEditor: this.props.showEditor || false,
			activeTable: this.props.tables[0] || testTableState,	// test table
		};
	}

	render() {
		return (
			<div className={styles.container}>
				{this.props.tables.map((table) => (
					<Table
						key={table.id}
						state={table.state}
						toggleEditor={(_) =>
							this.setState({ showEditor: !this.state.showEditor, activeTable: table })
						}
					/>
				))}

				<div className={this.state.showEditor ? '' : styles.hidden}>
					<Card>
						<h1>Edit participants</h1>

						<ul>
							{this.state.activeTable.state && this.state.activeTable.state.participants.map((participant, index) => (
								<li key={participant.globalInfo.id}>
									<span>{participant.getName()}</span>
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

	addTestUsers(table: TableInfo) {
		let newTableState = table.state || new TableState(table);
		let newUser = new User("Added user");

		if (table.state) {
			newTableState.participants = table.state.participants.concat(new RoomUser(newUser));
		}
		else {
			newTableState.participants = [new RoomUser(newUser)];
		}

		this.props.editTableCallback(table.id, newTableState);
	}

	removeUser(target: RoomUser, table: TableInfo) {
		let newTableState = table.state || new TableState(table);

		if (table.state) {
			newTableState.participants = table.state.participants.filter((user) => user.globalInfo.id !== target.globalInfo.id);
			this.props.editTableCallback(table.id, newTableState);
		}
		else {
			//error
			console.error("Table state not found");
		}
	}
}
