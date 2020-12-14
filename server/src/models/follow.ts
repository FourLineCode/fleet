import { Document, model, Schema } from 'mongoose'

export interface FollowType extends Document {
	from: string
	to: string
}

const followSchema = new Schema(
	{
		from: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		to: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Follow = model<FollowType>('follow', followSchema)

export default Follow
