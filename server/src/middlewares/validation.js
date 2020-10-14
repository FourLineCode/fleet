import Joi from '@hapi/joi'

const registerShema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(18).required(),
	username: Joi.string().min(2).max(32).required(),
	displayName: Joi.string().min(2).max(32).required(),
	isAdmin: Joi.boolean(),
})

export default registerShema
