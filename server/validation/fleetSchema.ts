import Joi from 'joi'

const fleetSchema = Joi.object({
	body: Joi.string().min(1).max(240).required(),
})

export default fleetSchema
