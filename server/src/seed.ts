import bcrypt from 'bcryptjs'
import User from './entity/User'

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
			bio: 'I made this website, i dont know what else to tell you about me LOL',
		})

		await newUser.save()

		for (const n of Array(10).keys()) {
			const username = `demo${n}`
			const displayName = `demo-user-${n}`
			const salt = await bcrypt.genSalt(10)
			const passwordHash = await bcrypt.hash(username, salt)

			const newUser = await User.create({
				username,
				displayName,
				email: `${username}@rip.com`,
				password: passwordHash,
				isAdmin: false,
				bio: `This is automated bio for ${displayName}`,
			})
			await newUser.save()
		}
	} catch (error) {
		console.log(error)
	}
}

export default seed_database
