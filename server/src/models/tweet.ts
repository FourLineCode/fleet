import { Document, model, Schema } from 'mongoose'

export interface TweetType extends Document {
	body: string
	likes?: string[]
	author: string
}

const reqString = {
	type: String,
	required: true,
}

const tweetSchema = new Schema(
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

const Tweet = model<TweetType>('tweet', tweetSchema)

export default Tweet
