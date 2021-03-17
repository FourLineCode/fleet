import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const main = async () => {
	const user = await prisma.user.findFirst({
		where: {
			email: 'akmal@rip.com',
		},
	})

	if (user) return

	const admin = await prisma.user.upsert({
		where: { email: 'akmal@rip.com' },
		update: {},
		create: {
			email: 'akmal@rip.com',
			password: await bcrypt.hash('admin00', 10),
			username: 'akmal',
			displayName: 'Akmal Hossain',
			bio: 'I created this website lmao',
			isAdmin: true,
		},
	})

	for (const n of Array(30).keys()) {
		const newUser = await prisma.user.upsert({
			where: { email: `demo${n}@rip.com` },
			update: {},
			create: {
				email: `demo${n}@rip.com`,
				password: await bcrypt.hash('admin', 10),
				username: `demo${n}`,
				displayName: `Demo user ${n}`,
				bio: `Auto generated bio for demo user ${n}`,
			},
		})

		if (n % 2 == 0) {
			await prisma.follow.create({
				data: {
					fromId: newUser.id,
					toId: admin.id,
				},
			})
		}

		for (const _ of Array(10).keys()) {
			await prisma.fleet.create({
				data: {
					body: `Example Fleet by demo user ${n}`,
					authorId: newUser.id,
				},
			})
		}
	}
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
