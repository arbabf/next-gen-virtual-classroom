import { Component } from "react";
import Button from "../../common/button/button";
import ButtonSet from "../../common/buttonset/buttonset";
import Icon from "../../common/icon/icon";
import styles from '../common.module.css';

type OnboardingProps = {
	/**
	 * Go back
	 */
	goBack: () => void;

	/**
	 * Callback to mark end of onboarding
	 */
	onComplete: () => void;
}

/**
 * Currently a stub component for any onboarding information.
 * 
 * This is the last part of a sign up flow.
 */
export class Onboarding extends Component<OnboardingProps> {
	render() {
		return <div className={styles.form}>
			<div className={styles.formGroup}>
				<h2>All done</h2>
				<p>
					This is a placeholder for future sign up steps.
				</p>
			</div>
			<ButtonSet className={styles.loginButtonSet}>
				{/* <Button onClick={(_) => this.props.goBack()} inverted>
					<Icon iconName="arrow_back" />
					<span>Back</span>
				</Button> */}
				<Button
					onClick={() => this.props.onComplete()}
				>
					<span>Get started</span>
					<Icon iconName="arrow_forward" />
				</Button>
			</ButtonSet>
		</div>;
	}
}