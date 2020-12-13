import { Document, model, Schema } from 'mongoose'

export interface FleetType extends Document {
	body: string
	likes?: string[]
	author: string
}

const reqString = {
	type: String,
	required: true,
}

const fleetSchema = new Schema(
	{
		body: reqString,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{
		timestamps: true,
	}
)

const Fleet = model<FleetType>('fleet', fleetSchema)

export default Fleet
