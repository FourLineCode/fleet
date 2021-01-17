import Joi from 'joi'

const replySchema = Joi.object({
	body: Joi.string().min(1).max(240).required(),
})

export default replySchema
