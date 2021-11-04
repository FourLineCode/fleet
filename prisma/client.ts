import { PrismaClient } from '@prisma/client';

declare global {
	var prismaClient: PrismaClient;
}

let prisma: PrismaClient;

// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prismaClient) {
		global.prismaClient = new PrismaClient({
			// log: ['query', 'error'],
		});
	}
	prisma = global.prismaClient;
}

export default prisma;
