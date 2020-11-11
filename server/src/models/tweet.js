import { Schema, model } from 'mongoose'

const reqString = {
	type: String,
	required: true,
}

const tweetSchema = Schema(
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

const Tweet = model('tweet', tweetSchema)

export default Tweet
