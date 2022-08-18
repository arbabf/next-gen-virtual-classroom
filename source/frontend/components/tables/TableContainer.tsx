import { Component } from 'react';
import React from 'react';
import styles from './TableContainer.module.css';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import { TableState } from '../../entities/Table';

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
};

export const TableEditor = ({ show = false, currentTable = 'Table name' }) => (
	<div className={show ? '' : styles.hidden}>
		<Card>
			<h1>Edit participants</h1>
			<li>
				<span>1</span>
				<span>John Wick</span>
				<Button>
					<span>Remove</span>
				</Button>
			</li>

			<li>
				<span>2</span>
				<span>Michael Li</span>
				<Button>
					<span>Remove</span>
				</Button>
			</li>

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
							<Button onClick={() => this.setState({ showEditor: !this.state.showEditor })}>
								Edit
							</Button>
						</ButtonSet>
					</Card>
				))}

				<TableEditor show={this.state.showEditor} currentTable={'test'}></TableEditor>
			</div>
		);
	}
}
