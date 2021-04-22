import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
	const user = await prisma.user.findFirst({
		where: {
			email: 'akmal@rip.com',
		},
	});

	if (user) return;

	const admin = await prisma.user.upsert({
		where: { email: 'akmal@rip.com' },
		update: {},
		create: {
			email: process.env.ADMIN_EMAIL || 'example@rip.com',
			password: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'example123', 10),
			username: process.env.ADMIN_USERNAME || 'example',
			displayName: process.env.ADMIN_DISPLAYNAME || 'EXAMPLE',
			bio: 'I created this website lmao',
			isAdmin: true,
			avatarURL: 'https://github.com/FourLineCode.png',
		},
	});

	for (const n of Array(30).keys()) {
		const newUser = await prisma.user.upsert({
			where: { email: `demo${n}@rip.com` },
			update: {},
			create: {
				email: `demo${n}@rip.com`,
				password: await bcrypt.hash('adminpp', 10),
				username: `demo${n}`,
				displayName: `Demo user ${n}`,
				bio: `Auto generated bio for demo user ${n}`,
				avatarURL: 'https://github.com/probot.png',
			},
		});

		if (n % 2 == 0) {
			await prisma.follow.create({
				data: {
					fromUserId: newUser.id,
					toUserId: admin.id,
				},
			});
		}

		for (const _ of Array(10).keys()) {
			await prisma.fleet.create({
				data: {
					body: `Example Fleet by demo user ${n}`,
					authorId: newUser.id,
				},
			});
		}
	}
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
