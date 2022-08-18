import { Component } from 'react';
import React from 'react';
import styles from './TableContainer.module.css';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';

/**
 * Table Container props.
 */

type TableContainerProps = {
	participants?: number;
	showEditor?: boolean;
	tables: string[];
};

type TableContainerState = {
	/**
	 * Current set of participants
	 */
	participants: number;
	/**
	 * Whether the editor is visible
	 */
	showEditor: boolean;
	/**
	 * Current set of tables
	 */
	tables: string[];
};

const EditParticipants = ({ show = false, currentTable = 'Table name' }) => (
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
			participants: this.props.participants === undefined ? 0 : this.props.participants,
			showEditor: this.props.showEditor === undefined ? false : this.props.showEditor,
			tables: this.props.tables,
		};
	}

	render() {
		return (
			<div className={styles.container}>
				{this.props.tables.map((table) => (
					<Card key={table}>
						<h1>{table}</h1>

						<ButtonSet>
							<Button onClick={() => this.setState({ showEditor: !this.state.showEditor })}>
								Edit
							</Button>
						</ButtonSet>
					</Card>
				))}

				<EditParticipants show={!this.state.showEditor} currentTable={'test'}></EditParticipants>
			</div>
		);
	}
}
