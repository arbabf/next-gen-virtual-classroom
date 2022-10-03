import { ChangeEventHandler, Component } from "react";
import styles from "./FormField.module.css";

type FormFieldProps = {
	/**
	 * Label to show on form
	 */
	label?: string;

	/**
	 * Type of content
	 */
	type: string;

	/**
	 * An ID for the field to make labels work
	 */
	id: string;

	/**
	 * Placeholder text to show when empty
	 */
	placeholder?: string;

	/**
	 * Value of the field to be controlled by parent
	 */
	value?: string | number;

	/**
	 * Function to call when the field changes
	 */
	onChange?: ChangeEventHandler;
}

export class FormField extends Component<FormFieldProps> {
	render() {
		return <div className={styles.field}>
			<label htmlFor={this.props.id}>{this.props.label}</label>
			<input
				type={this.props.type}
				id={this.props.id}
				placeholder={this.props.placeholder}
				value={this.props.value}
				onChange={this.props.onChange}
			/>
		</div>
	}
}