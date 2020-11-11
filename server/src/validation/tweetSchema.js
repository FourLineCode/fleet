import Joi from '@hapi/joi'

const tweetSchema = Joi.object({
	body: Joi.string().min(1).max(240).required(),
	author: Joi.string().required(),
})

export default tweetSchema
