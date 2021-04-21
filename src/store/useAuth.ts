import axios from 'axios';
import { useCurrentUser } from 'src/store/useCurrentUser';
import create, { State } from 'zustand';
import { config } from '~/config/config';

interface SignInInput {
	email: string;
	password: string;
}

interface SignUpInput {
	email: string;
	username: string;
	displayName: string;
	password: string;
	bio: string;
}

interface Response {
	success: boolean;
	message: string;
}

export interface AuthState extends State {
	authorized: boolean | null;
	id: number | null;
	token: string | null;
	refreshToken: string | null;
	signup: (arg: SignUpInput) => Promise<Response>;
	signin: (arg: SignInInput) => Promise<Response>;
	signout: () => Promise<Response>;
	setAuthInfo: (arg: Partial<AuthState>) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
	authorized: null,
	id: null,
	token: null,
	refreshToken: null,
	signup: async ({ email, password, username, displayName, bio }) => {
		try {
			const res = await axios.post(`${config.api}/user/signup`, {
				email,
				username,
				displayName,
				password,
				bio,
			});
			const data = res.data;

			if (data.id) {
				useAuth.getState().signin({ email, password });
				return { success: true, message: 'Successfully signed up' };
			}
		} catch (error) {
			return { success: false, message: error.response.data.message };
		}

		return { success: false, message: 'An unknown error has occured' };
	},
	signin: async ({ email, password }) => {
		try {
			const res = await axios.post(`${config.api}/user/signin`, { email, password });
			const data = res.data;

			if (data.success) {
				get().setAuthInfo({
					authorized: data.success,
					id: data.id,
					token: data.token,
					refreshToken: data.refreshToken,
				});

				return { success: true, message: 'Successfully signed in' };
			}
		} catch (error) {
			return { success: false, message: error.response.data.message };
		}

		return { success: false, message: 'An unknown error has occured' };
	},
	signout: async () => {
		try {
			const res = await axios.post(`${config.api}/user/signout`);
			const data = res.data;

			if (data.success) {
				get().setAuthInfo({
					authorized: false,
					id: null,
					token: null,
					refreshToken: null,
				});

				return { success: true, message: 'Successfully signed out' };
			}
		} catch (error) {
			return { success: false, message: 'An unknown error has occured' };
		}
		return { success: false, message: 'An unknown error has occured' };
	},
	setAuthInfo: (payload) => {
		set(payload);

		if (payload?.id) {
			useCurrentUser.getState().getUserInfo(payload.id);
		}
	},
}));
