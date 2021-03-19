import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export type TokenType = 'AUTH' | 'REFRESH'
export type TokenAge = '24h' | '1y'

const SECRETS: Record<TokenType, string> = {
	AUTH: process.env.JWT_SECRET || 'secret',
	REFRESH: process.env.JWT_REFRESH_SECRET || 'secret',
}

export const signToken = (payload: Record<string, string | number | boolean>, age: TokenAge, type: TokenType) => {
	const secret = SECRETS[type]

	return jwt.sign(payload, secret, {
		expiresIn: age,
	})
}

export const verifyToken = (token: string, type: TokenType): User => {
	return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'sercet') as User
}
