import Joi from 'joi';

export const fleetSchema = Joi.object({
	body: Joi.string().min(1).max(240).required(),
});
