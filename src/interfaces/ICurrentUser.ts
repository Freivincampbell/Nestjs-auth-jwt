import { ObjectId } from 'mongoose';

export interface ICurrentUser {
	readonly id: ObjectId;
	readonly username: string;
	readonly role: string;
}
