import bcrypt from 'bcryptjs'
import Fleet from './entity/Fleet'
import Follow from './entity/Follow'
import User from './entity/User'

const seed_database = async () => {
	try {
		const user = await User.findOne()
		if (user) {
			console.log('Database already seeded!')
			return
		}

		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash('admin00', salt)

		const adminUser = await User.create({
			username: 'akmal',
			displayName: 'Akmal Hossain',
			email: 'akmal@rip.com',
			password: passwordHash,
			isAdmin: true,
			bio: 'I made this website, i dont know what else to tell you about me LOL',
		})

		await adminUser.save()

		for (const n of Array(30).keys()) {
			const username = `demo${n}`
			const displayName = `demo-user-${n}`
			const salt = await bcrypt.genSalt(10)
			const passwordHash = await bcrypt.hash('admin', salt)

			const newUser = await User.create({
				username,
				displayName,
				email: `${username}@rip.com`,
				password: passwordHash,
				isAdmin: false,
				bio: `This is automated bio for ${displayName}`,
			})

			await newUser.save()

			if (n % 2 == 0) {
				await Follow.create({ from: newUser, to: adminUser }).save()
			}

			for (const _ of Array(10).keys()) {
				await Fleet.create({
					body: `Example Fleet by demo user ${n}`,
					author: newUser,
				}).save()
			}
		}

		console.log('\nThe database was seeded successfully!\n')
	} catch (error) {
		console.log(error)
	}
}

export default seed_database
