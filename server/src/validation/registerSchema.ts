import Joi from '@hapi/joi'

const registerShema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(18).required(),
	username: Joi.string()
		.min(2)
		.max(32)
		.regex(/^[A-Za-z0-9_]{1,15}$/)
		.required(),
	displayName: Joi.string().min(2).max(32).required(),
	bio: Joi.string().max(256),
	isAdmin: Joi.boolean(),
})

export default registerShema
