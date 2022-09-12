import { Capabilities } from "./Capabilities";
import { DefaultCapabilities } from "./DefaultCapabilities";
import { Participant } from "./Participant";
import { Role } from "./Role";

export class Facilitator extends Role {
	name: string = 'Facilitator';
	description: string = 'Helps the host run the classroom as a moderator-like role';
	capabilities: Capabilities[] = DefaultCapabilities.facilitator;
}