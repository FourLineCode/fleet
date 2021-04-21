import * as yup from 'yup';

export const signupShema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(6).max(18).required(),
	username: yup
		.string()
		.min(2)
		.max(32)
		.matches(/^[A-Za-z0-9_]{1,15}$/)
		.required(),
	displayName: yup.string().min(2).max(32).required(),
	bio: yup.string().min(0).max(256).ensure(),
	isAdmin: yup.boolean(),
});
