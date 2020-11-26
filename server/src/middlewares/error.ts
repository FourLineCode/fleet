import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(StatusCodes.NOT_FOUND)
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
	next(error)
}

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode =
		res.statusCode !== StatusCodes.OK
			? res.statusCode
			: StatusCodes.INTERNAL_SERVER_ERROR
	res.status(statusCode)
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
	})
}
