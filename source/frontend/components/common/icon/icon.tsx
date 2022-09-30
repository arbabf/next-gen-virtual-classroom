import Image from 'next/image';
import { Component, CSSProperties } from 'react';
import styles from './Icon.module.css';

/**
 * Props used to configure an icon, including size, alt text, and what to display.
 */
type IconProps = {
	/**
	 * Source path for an image file
	 */
	imageSrc?: string;

	/**
	 * A Material Design icon name. The list of them can be found here:
	 * https://fonts.google.com/icons
	 */
	iconName?: string;

	/**
	 * CSS/HTML-style size string
	 */
	size?: string;

	/**
	 * Alt text if the image can't load or the user uses a screen reader
	 */
	altText?: string;

	/**
	 * Additional classes
	 */
	className?: string;
};

/**
 * Displays an icon, which is a square image. It can use a defined image or the name of a Material
 * Design icon.
 *
 * For a list of Material Icons: https://fonts.google.com/icons
 */
class Icon extends Component<IconProps> {
	render() {
		// default values
		let size = '1.5em';
		let altText = '';

		if (this.props.size) {
			size = this.props.size;
		}

		if (this.props.altText) {
			altText = this.props.altText;
		}

		let iconFontStyle: CSSProperties = {
			fontSize: size,
		};

		let classes = "";

		if (this.props.className) classes += this.props.className;
		if (this.props.iconName) classes += " " + styles.named;

		if (this.props.imageSrc) {
			return <Image className={classes} src={this.props.imageSrc} height={size} width={size} alt={altText} />;
		} else if (this.props.iconName) {
			return (
				<span
					className={classes}
					style={iconFontStyle}
				>
					{this.props.iconName}
				</span>
			);
		}

		return <div className={styles.container}>{this.props.imageSrc !== undefined}</div>;
	}
}

export default Icon;
