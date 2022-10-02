import { Component } from "react";
import Card from "../common/card/card";
import styles from "./Login.module.css";
import { LoginFlow } from "./LoginFlow";

type LoginProps = {

}

type LoginState = {
	/**
	 * Whether logging in or signing up
	 */
	loggingIn: boolean;
}

export class Login extends Component {
	state = {
		loggingIn: true
	}

	render() {
		return <Card className={styles.main}>
			<h1>{
				this.state.loggingIn ? "Log in" : "Sign up"
			}</h1>
			<LoginFlow />
		</Card>;
	}
}