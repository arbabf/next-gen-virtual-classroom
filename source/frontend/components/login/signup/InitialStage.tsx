import { ChangeEvent, Component } from "react";
import { User } from "../../../entities/User";
import Button from "../../common/button/button";
import ButtonSet from "../../common/buttonset/buttonset";
import { FormField } from "../../common/form/FormField";
import Icon from "../../common/icon/icon";
import styles from '../common.module.css';

type InitialStageProps = {
	/**
	 * Callback to mark completion of user creation
	 */
	createUser: (name: string, email: string) => void;

	/**
	 * Callback to go back one stage
	 */
	goBack: () => void;
}

type InitialStageState = {
	nameField: string;
	emailField: string;
	savedUser?: User;
}

/**
 * First stage in sign up flow, usually getting name and email
 */
export class InitialStage extends Component<InitialStageProps, InitialStageState> {
	state = {
		nameField: '',
		emailField: ''
	}

	componentDidMount(): void {
		this.fetchSavedUser();
	}

	render() {
		return <div className={styles.form}>
			<div className={styles.formGroup}>
				<h2>About you</h2>
				<FormField
					label="Your name"
					id="name"
					type="text"
					placeholder="Enter your name"
					value={this.state.nameField}
					onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ nameField: event.target.value })}
				/>
				<FormField
					label="Email"
					id="email"
					type="email"
					placeholder="Enter your email address"
					value={this.state.emailField}
					onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ emailField: event.target.value })}
				/>
			</div>
			<ButtonSet className={styles.loginButtonSet}>
				<Button onClick={(_) => this.props.goBack()} inverted>
					<Icon iconName="arrow_back" />
					<span>Return to login</span>
				</Button>
				<Button
					onClick={(_) => this.props.createUser(this.state.emailField, this.state.nameField)}
					disabled={this.state.nameField.length === 0 || this.state.emailField.length === 0}
				>
					<span>Next</span>
					<Icon iconName="arrow_forward" />
				</Button>
			</ButtonSet>
		</div>;
	}

	/**
	 * Fetch user from storage if moving around the same flow
	 */
	fetchSavedUser() {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			console.log("Restoring existing user");

			// set the fields to the saved user
			const user = JSON.parse(savedUser) as User;

			this.setState({
				nameField: user.name,
				emailField: user.email || '',
				savedUser: user
			});
		}
	}
}