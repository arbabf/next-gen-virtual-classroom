import { ChangeEvent, Component } from "react";
import { UserAPI } from "../../lib/UserAPI";
import { FormField } from "../common/form/FormField";
import styles from "./common.module.css";
import { EmailFlowResponse } from "../../lib/auth/LoginResponses";
import { AuthFlow } from "../../lib/auth/AuthFlow";
import Button from "../common/button/button";
import Icon from "../common/icon/icon";
import ButtonSet from "../common/buttonset/buttonset";

type LoginFlowProps = {
	/**
	 * Callback to switch to sign up
	 */
	onSignUp: () => void,
};

type LoginFlowState = {
	currentFlow?: AuthFlow,
	email: string,
};

export class LoginFlow extends Component<LoginFlowProps, LoginFlowState> {
	state: LoginFlowState = {
		currentFlow: undefined,
		email: '',
	}

	render() {
		const enterEmailStage = <>
			<FormField
				label="Email"
				id="email"
				type="email"
				placeholder="Your email address"
				value={this.state.email}
				onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ email: event.target.value })}
			/>
			<ButtonSet className={styles.loginButtonSet}>
				<Button onClick={() => this.props.onSignUp()} inverted>
					<Icon iconName="person_add" />
					<span>Create account</span>
				</Button>
				<Button onClick={() => this.checkEmail()}>
					<span>Next</span>
					<Icon iconName="arrow_forward" />
				</Button>
			</ButtonSet>
		</>;

		return <div className={styles.form}>
			{!this.state.currentFlow && enterEmailStage}
		</div>
	}

	/**
	 * Checks the email and proceeds to appropriate login flow
	 */
	private checkEmail() {
		if (this.state.email) UserAPI.loginSubmitEmail(this.state.email)
			.then((response) => {
				if (!response) this.props.onSignUp();
				else if (response instanceof EmailFlowResponse) {
					console.log("Got flow: " + response.flow);
					this.setState({ currentFlow: response.flow });
				}
			});
	}
}