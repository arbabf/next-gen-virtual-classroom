import { Component } from 'react';
import styles from './SignUp.module.css';

type SignUpProps = {

}

type SignUpState = {
	nameField: string;
	emailField: string;
}

export class SignUp extends Component {
	render() {
		return <form className={styles.form}>
			<div className={styles.formGroup}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" placeholder="Your name" />

				<label htmlFor="email">Email</label>
				<input type="email" id="email" placeholder="Your email address" />
			</div>
		</form>
	}
}