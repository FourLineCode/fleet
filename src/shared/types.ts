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
    bannerURL: string;
}

export interface FleetType extends Base {
    body: string;
    likes: LikeType[];
    replies: ReplyType[];
    authorId: number;
    author: UserType;
}

export interface LikeType extends Base {
    fleetId: number;
    userId: number;
}

export interface ReplyType extends Base {
    body: string;
    user: UserType;
    fleetId: number;
    userId: number;
}
