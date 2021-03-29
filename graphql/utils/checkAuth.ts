import { Context } from '../context';

type RoleTypes = 'ADMIN' | 'USER';

export const checkAuth = (role: RoleTypes = 'USER') => (_root: {}, _args: any, ctx: Context) => {
	const AuthStates: Record<RoleTypes, boolean> = {
		ADMIN: ctx.authorized && ctx.isAdmin,
		USER: ctx.authorized,
	};

	return AuthStates[role];
};
