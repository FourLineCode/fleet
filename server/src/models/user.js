import { Schema, model } from 'mongoose'

const reqString = {
	type: String,
	required: true,
}

const userSchema = Schema(
	{
		username: {
			...reqString,
			index: {
				unique: [true, 'Username already exists!'],
				collation: { locale: 'en', strength: 2 },
			},
		},
		displayName: reqString,
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

const User = model('user', userSchema)

export default User
