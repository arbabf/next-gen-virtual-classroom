import router from 'next/router';
import { Component } from 'react';
import { User } from '../../entities/User';
import { UserAPI } from '../../lib/UserAPI';
import styles from './common.module.css';
import { InitialStage } from './signup/InitialStage';
import { Onboarding } from './signup/Onboarding';

type SignUpStage = 'initial' | 'onboarding';

type SignUpProps = {
	/**
	 * Returns to login
	 */
	onLogin: () => void;
}

type SignUpState = {
	currentUser?: User;
	stage: SignUpStage;
}

export class SignUp extends Component<SignUpProps, SignUpState> {
	state: SignUpState = {
		stage: 'initial'
	}

	render() {
		const initialStage = <InitialStage goBack={this.props.onLogin} createUser={this.createAccount.bind(this)} />;
		const onboardingStage = <Onboarding goBack={() => this.setState({ stage: 'initial' })} onComplete={this.finaliseSignUp.bind(this)} />;

		return <div className={styles.form}>
			{this.state.stage === 'initial' && initialStage}
			{this.state.stage === 'onboarding' && onboardingStage}
		</div>;
	}

	/**
	 * Creates a new user and then proceeds to onboarding
	 */
	private createAccount(name: string, email: string) {
		// check if user already exists
		if (this.state.currentUser) {
			// go straight to onboarding
			this.setState({ stage: 'onboarding' });
		} else {
			// request to API
			UserAPI.signup(name, email)
				.then((user) => {
					// save to storage
					localStorage.setItem('currentUser', JSON.stringify(user));

					// save user in state
					this.setState({ currentUser: user });

					// go to onboarding
					this.setState({ stage: 'onboarding' });
				})
				.catch();
		}
	}

	/**
	 * Finishes onboarding and sends user to dashboard
	 */
	private finaliseSignUp() {
		// redirect to dashboard
		router.push('/dashboard');
	}
}