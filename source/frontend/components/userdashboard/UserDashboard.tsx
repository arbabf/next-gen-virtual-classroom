import Router from 'next/router';
import { Component, ReactNode } from 'react';
import { RoomGroup } from '../../entities/org/RoomGroup';
import { RoomInfo } from '../../entities/Room';
import { testRoom } from '../../entities/TestEntities';
import { User } from '../../entities/User';
import { UserAPI } from '../../lib/UserAPI';
import Button from '../common/button/button';
import Card from '../common/card/card';
import Icon from '../common/icon/icon';
import { DirectoryNode } from './DirectoryNode';
import styles from './UserDashboard.module.css';

type UserDashboardProps = {
	/**
	 * Current, logged in user
	 */
	user: User;
};

type UserDashboardState = {
	/**
	 * Set of rooms that the user would be a part of
	 */
	rooms: RoomInfo[];

	/**
	 * Logged-in user
	 */
	user?: User;

	/**
	 * Nodes in the directory listing used to help construct hierarchy
	 */
	nodes: Map<string, DirectoryNode>;

	/**
	 * Top-level nodes
	 */
	rootNodes: DirectoryNode[];
};

export default class UserDashboard extends Component<UserDashboardProps, UserDashboardState> {
	state: UserDashboardState = {
		rooms: [testRoom],
		nodes: new Map(),
		rootNodes: []
	};

	componentDidMount() {
		// check storage for user info
		const savedUser = this.fetchSavedUser();

		if (savedUser) {
			// fetch the user's rooms
			this.fetchUserRooms(savedUser);
		}
		else {
			// redirect to login
			Router.push('/login');
		}
	}

	render(): ReactNode {
		// construct room groups


		return (
			<>
				<main className="content">
					<header>
						<div className="container">
							<h1>Welcome{this.state.user && `, ${this.state.user.name}`}</h1>
						</div>
					</header>
					<section>
						<div className="container">
							<h2>Your classes</h2>
							{/* <div className={styles.roomList}>
								{this.state.rooms.map((room) => (
									<Card key={room.id}>
										<h3>{this.state.rooms[0].name}</h3>
										<Button>
											<Icon iconName="login" />
											<span>Join</span>
										</Button>
									</Card>
								))}
							</div> */}
							<div className={styles.roomList}>
								{this.state.rootNodes.map((node) => this.renderNode(node))}
							</div>
						</div>
					</section>
				</main>
			</>
		);
	}

	/**
	 * Fetches the user's saved info from localStorage
	 */
	private fetchSavedUser(): User | undefined {
		const savedUser = localStorage.getItem('currentUser');
		if (savedUser) {
			// set the fields to the saved user
			const user = JSON.parse(savedUser) as User;

			this.setState({ user });

			return user;
		}

		return;
	}

	/**
	 * Fetches the user's rooms from the API
	 */
	private fetchUserRooms(user: User): void {
		UserAPI.getUserRooms(user).then((rooms) => {
			// build the directory nodes
			this.constructNodes(rooms);

			// set state
			this.setState({ rooms })
		});
	}

	/**
	 * Construct hierarchy of rooms
	 */
	private constructNodes(rooms: RoomInfo[]): void {
		const nodes = new Map<string, DirectoryNode>();
		const rootNodes: DirectoryNode[] = [];

		// go thru each room and construct nodes
		rooms.forEach((room) => this.constructNode(room, nodes, rootNodes));

		this.setState({ nodes, rootNodes });
	}

	/**
	 * Recursively produces nodes from a group
	 */
	private constructNode(entity: RoomGroup | RoomInfo, map: Map<String, DirectoryNode>, rootNodes: DirectoryNode[]): DirectoryNode {
		if (entity instanceof RoomGroup) {
			if (entity.parents.length < 1) {
				const node = new DirectoryNode(entity);

				// add this node to the map if it doesn't exist
				if (!map.has(entity.id)) {
					map.set(entity.id, node);
				}

				// add to top-level
				rootNodes.push(node);

				// return this node
				return node;
			}
			else {
				// recurse into last item in list - immediate parent
				const parent = this.constructNode(entity.parents[entity.parents.length - 1], map, rootNodes);

				// add self to parent
				const node = new DirectoryNode(entity);
				parent.children.push(node);

				// update parent in map
				map.set(parent.id, parent);

				// return self
				return node;
			}
		}
		else if (entity instanceof RoomInfo) {
			// room info - we want to grab its group and recurse
			// first, if no group, just return a top-level node
			if (!entity.group) {
				const node = new DirectoryNode(entity);

				// add to map
				if (!map.has(entity.id)) map.set(entity.id, node);

				// add to top-level
				rootNodes.push(node);

				return node;
			}
			else {
				// get parent, add this, return parent
				const parent = this.constructNode(entity.group, map, rootNodes);

				// add self
				const node = new DirectoryNode(entity);
				parent.children.push(node);

				// update map
				map.set(parent.id, parent);

				// return self
				return node;
			}
		}
		else {
			throw new Error('Invalid entity type');
		}
	}

	/**
	 * Recursively renders children of node
	 * 
	 * @param node The node to render
	 */
	private renderNode(node: DirectoryNode): ReactNode {
		return (
			<Card key={node.id}>
				<h3>{node.entity.name}</h3>
				{node.entity instanceof RoomInfo &&
					<Button onClick={(_) => Router.push('/')}>
						<Icon iconName="login" />
						<span>Join</span>
					</Button>
				}
				{node.children && node.children.length > 0 &&
					<div className={styles.roomList}>
						{node.children.map((child) => this.renderNode(child))}
					</div>
				}
			</Card>
		);
	}
}
