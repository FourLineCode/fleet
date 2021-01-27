import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import next from 'next'
import { createConnection } from 'typeorm'
import { parse } from 'url'
import routes from './api'
import { errorHandler, notFound } from './middlewares/error'
import seed_database from './seed'

require('dotenv').config()

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const init = async () => {
	try {
		const server = express()

		await createConnection()

		server.use(express.json())
		server.use(cors({ credentials: true }))
		server.use(
			morgan('dev', {
				skip: (req) => !req.baseUrl.startsWith('/api'),
			})
		)
		server.use('/api', helmet())

		server.use('/api', routes)

		const app = next({ dev })
		const handle = app.getRequestHandler()

		server.all('*', (req, res) => {
			const parsedUrl = parse(req.url, true)
			const { pathname, query } = parsedUrl

			if (pathname === '/a') {
				app.render(req, res, '/a', query)
			} else if (pathname === '/b') {
				app.render(req, res, '/b', query)
			} else {
				handle(req, res, parsedUrl)
			}
		})

		server.use('api', notFound)
		server.use('/api', errorHandler)

		server.listen(PORT, () => {
			console.log(`\nServer started on http://localhost:${PORT}...\n`)
		})

		seed_database()

		await app.prepare()
	} catch (error) {
		console.log(error)
	}
}

init()
