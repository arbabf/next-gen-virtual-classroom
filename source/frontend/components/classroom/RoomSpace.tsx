import { Component, ReactNode } from 'react';
import { Room } from '../../entities/Room';
import Button from '../common/button/button';
import ButtonSet from '../common/buttonset/buttonset';
import Card from '../common/card/card';
import Modal from '../common/modal/Modal';
import styles from './RoomSpace.module.css';

type RoomSpaceProps = {
	/**
	 * Room entity to fill out this space
	 */
	room: Room;
};

/**
 * The render space for a Room.
 */
export default class RoomSpace extends Component<RoomSpaceProps> {
	render(): ReactNode {
		return (
			<>
				<header className={styles.header}>
					<h1>{this.props.room.name}</h1>
				</header>
				<main>
					<Modal open>
						<h2>Welcome</h2>

						<p>This is a paragraph within a card.</p>

						<p>Below is a set of buttons.</p>

						<ButtonSet>
							<Button
								label="Filled button"
								onClick={() => {
									console.log('HI');
								}}
							/>
							<Button label="Unfilled button" unfilled />
							<Button label="Filled &amp; disabled" disabled />
							<Button label="Unfilled &amp; disabled" unfilled disabled />
						</ButtonSet>
					</Modal>
				</main>
			</>
		);
	}
}
