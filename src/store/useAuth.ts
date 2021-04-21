import axios from 'axios';
import { useCurrentUser } from 'src/store/useCurrentUser';
import create, { State } from 'zustand';
import { config } from '~/config/config';

interface SignInInput {
	email: string;
	password: string;
}

export interface AuthState extends State {
	authorized: boolean;
	id: number | null;
	token: string | null;
	refreshToken: string | null;
	signin: (arg: SignInInput) => Promise<[boolean, Error | null]>;
	signout: () => Promise<boolean>;
	setAuthInfo: (arg: Partial<AuthState>) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
	authorized: false,
	id: null,
	token: null,
	refreshToken: null,
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

				return [true, null];
			}
		} catch (error) {
			return [false, error];
		}

		return [false, new Error('An unknown error has occured')];
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

				return true;
			}
		} catch (error) {
			return false;
		}
		return false;
	},
	setAuthInfo: (payload) => {
		set(payload);

		if (payload?.id) {
			const user = useCurrentUser();
			user.getUserInfo(payload.id);
		}
	},
}));
