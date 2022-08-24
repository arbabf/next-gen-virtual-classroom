/**
 * A file hosted within the classroom
 */
export class Resource {
	/**
	 * Unique ID
	 */
	id: string;

	/**
	 * Name for resource
	 */
	name: string;

	/**
	 * Where the resource is stored/hosted
	 */
	location: string;

	constructor(id: string, name: string, location: string) {
		this.id = id;
		this.name = name;
		this.location = location;
	}
}

export const testResource = new Resource(
	'0',
	'Google Privacy Policy',
	'https://www.gstatic.com/policies/privacy/pdf/20220210/8e0kln2a/google_privacy_policy_en.pdf'
);
