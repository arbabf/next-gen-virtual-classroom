export enum AuthFlow {
	password = "password",
	magicLink = "magicLink",
	webauthn = "webauthn",
	/**
	 * Dangerous debug option that logs you in directly with just email
	 */
	skip = "skip"
}