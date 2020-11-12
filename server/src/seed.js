import User from './models/user'
import bcrypt from 'bcryptjs'

const seed_database = async () => {
	try {
		const user = await User.findOne()
		if (user) return

		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash('akmal123', salt)

		const newUser = await User.create({
			username: 'akmal',
			displayName: 'Akmal Hossain',
			email: 'akmal@rip.com',
			password: passwordHash,
			isAdmin: true,
		})

		await newUser.save()
	} catch (error) {
		console.log(error)
	}
}

export default seed_database
