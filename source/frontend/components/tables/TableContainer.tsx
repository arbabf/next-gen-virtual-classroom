import { Component } from 'react';
import React from 'react';
import styles from './TableContainer.module.css';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import { TableState, testTableState } from '../../entities/Table';

/**
 * Table Container props.
 */

type TableContainerProps = {
	showEditor?: boolean;
	tables: TableState[];
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

export const TableEditor = ({ show = false, currentTable = testTableState }) => (
	<div className={show ? '' : styles.hidden}>
		<Card>
			<h1>Edit participants</h1>

			<ul>
				{currentTable.participants.map((participant, index) => (
					<li key={participant.id}>
						<span>{participant.name}</span>
						<Button>
							<span>Remove</span>
						</Button>
					</li>
				))}
			</ul>

			<ButtonSet>
				<Button>
					<span>Add participants</span>
				</Button>
			</ButtonSet>
		</Card>
	</div>
);

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
					<Card key={table.info.id}>
						<div className="participants">
							{table.participants.map((participant, index) => (
								<div key={participant.id}>
									<p>{participant.name}</p>
								</div>
							))}
						</div>

						<ButtonSet>
							<Button
								onClick={() =>
									this.setState({ showEditor: !this.state.showEditor, activeTable: table })
								}
							>
								Edit
							</Button>
						</ButtonSet>
					</Card>
				))}

				<TableEditor show={this.state.showEditor} currentTable={testTableState}></TableEditor>
			</div>
		);
	}
}
