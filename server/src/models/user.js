import { Schema, model } from 'mongoose'

const reqString = {
	type: String,
	required: true,
}

const userSchema = Schema(
	{
		username: { ...reqString, unique: true },
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
