import { ChangeEventHandler, Component } from 'react';
import styles from './SwitchSetting.module.css';

type SwitchSettingProps = {
	/**
	 * Text to show prominently in the setting
	 */
	label: string;

	/**
	 * Current value of the setting
	 */
	value: boolean;

	/**
	 * Callback when the setting is changed
	 */
	onChange: ChangeEventHandler<HTMLInputElement>;

	/**
	 * Optional extended description to show below the label
	 */
	description?: string;
};

/**
 * A setting that allows you to toggle between true and false.
 */
export default class SwitchSetting extends Component<SwitchSettingProps> {
	render() {
		return (
			<div className={styles.group}>
				<label>
					<div className={styles.labelStack}>
						<p className={styles.title}>{this.props.label}</p>
						{this.props.description && (
							<p className={styles.description}>{this.props.description}</p>
						)}
					</div>
					<input
						type="checkbox"
						id="switch"
						checked={this.props.value}
						onChange={this.props.onChange}
					/>
				</label>
			</div>
		);
	}
}
