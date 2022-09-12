import { Component } from "react";
import { TableState } from "../../entities/Table";
import { UserView } from "../user/UserView";
import styles from "./RoamingSpace.module.css";

type RoamingSpaceProps = {
	/**
	 * Roaming space is a special table
	 */
	state: TableState;
}

/**
 * The roaming space is a special case of table and is the default table for all users.
 * 
 * It is a common area where users from different tables can meet.
 */
export class RoamingSpace extends Component<RoamingSpaceProps> {
	render() {
		return <div className={styles.roaming}>
			<div className={styles.participants}>
				{this.props.state.participants.map((participant) =>
					<UserView key={participant.id} user={participant} />
				)}
			</div>
		</div>
	}
}