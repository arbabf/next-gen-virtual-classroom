import { Capabilities } from "./Capabilities";
import { DefaultCapabilities } from "./DefaultCapabilities";
import { Role } from "./Role";

export class Participant extends Role {
	name: string = 'Participant';
	description: string = 'Default member of a classroom';
	capabilities: Capabilities[] = DefaultCapabilities.participant;

}