import jwt from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'
import { Context } from '../types/Context'

export const authChecker: AuthChecker<Context> = ({ context }) => {
	const refreshToken = context.req.headers['authorization'] as string

	if (!refreshToken) {
		return false
	}

	const validated = jwt.verify(refreshToken, process.env.JWT_SECRET || 'secret')

	return !!validated
}
