import { Document, model, Schema } from 'mongoose'

export interface UserType extends Document {
	username: string
	displayName: string
	bio: string
	email: string
	password: string
	isAdmin?: boolean
	createdAt?: string
}

const reqString = {
	type: String,
	required: true,
}

const userSchema = new Schema(
	{
		username: {
			...reqString,
			index: {
				// @ts-ignore: This Actually works
				unique: [true, 'Username already exists!'],
				collation: { locale: 'en', strength: 2 },
			},
		},
		displayName: reqString,
		bio: reqString,
		email: { ...reqString, unique: true },
		password: reqString,
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

const User = model<UserType>('user', userSchema)

export default User
