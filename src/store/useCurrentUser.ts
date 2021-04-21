import axios from 'axios';
import create, { State } from 'zustand';
import { config } from '~/config/config';

export interface UserState extends State {
	id?: number;
	email?: string;
	username?: string;
	displayName?: string;
	bio?: string;
	avatarURL?: string;
	isAdmin: boolean;
	createdAt?: string;
	getUserInfo: (arg: number) => void;
	setUserInfo: (arg: Partial<UserState>) => void;
	clearCurrentUser: () => void;
}

export const useCurrentUser = create<UserState>((set, get) => ({
	id: undefined,
	email: undefined,
	username: undefined,
	displayName: undefined,
	bio: undefined,
	avatarURL: undefined,
	isAdmin: false,
	createdAt: undefined,
	getUserInfo: async (id) => {
		try {
			const res = await axios.get(`${config.api}/user/info/${id}`);
			const data = res.data;

			get().setUserInfo(data);
		} catch (error) {
			// TODO: handle error
			console.log(error);
		}
	},
	setUserInfo: (payload) => {
		set(payload);
	},
	clearCurrentUser: () => {
		set({
			id: undefined,
			email: undefined,
			username: undefined,
			displayName: undefined,
			bio: undefined,
			avatarURL: undefined,
			isAdmin: false,
			createdAt: undefined,
		});
	},
}));
