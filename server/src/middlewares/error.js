export const notFound = (req, res, next) => {
	res.status(404)
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
	next(error)
}

export const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500
	res.status(statusCode)
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
	})
}
