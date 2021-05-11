import { Like, Reply } from '@prisma/client';

interface Base {
	id: number;
	createdAt: string;
	updatedAt: string;
}

export interface UserType extends Base {
	email: string;
	username: string;
	displayName: string;
	isAdmin: boolean;
	bio: string;
	avatarURL: string;
}

export interface FleetType extends Base {
	body: string;
	likes: Like[];
	replies: Reply[];
	authorId: number;
	author: UserType;
}

export interface LikeType extends Base {
	fleetId: number;
	userId: number;
}

export interface ReplyType extends Base {
	body: string;
	fleetId: number;
	userId: number;
}
