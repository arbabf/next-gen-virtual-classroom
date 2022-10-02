import { Component } from "react";
import { FormField } from "../common/form/FormField";
import styles from "./LoginFlow.module.css";

export class LoginFlow extends Component {
	render() {
		return <form className={styles.form}>
			<FormField label="Email" id="email" type="email" placeholder="Your email address" />
		</form>
	}
}