declare namespace Express {
	interface Request {
		admin?: boolean
		authorized: boolean
		userId: string
	}
}
