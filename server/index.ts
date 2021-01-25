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

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const app = express()

const init = async () => {
	try {
		await nextApp.prepare()

		app.use(express.json())
		app.use(cors({ credentials: true }))
		app.use(morgan('dev'))
		app.use('/api', helmet())

		await createConnection()

		app.use('/api', routes)
		app.all('*', (req, res) => {
			const parsedUrl = parse(req.url, true)
			const { pathname, query } = parsedUrl

			if (pathname === '/a') {
				nextApp.render(req, res, '/a', query)
			} else if (pathname === '/b') {
				nextApp.render(req, res, '/b', query)
			} else {
				handle(req, res, parsedUrl)
			}
		})

		app.use(notFound)
		app.use(errorHandler)

		app.listen(PORT, () => {
			console.log(`\nServer started on http://localhost:${PORT}...\n`)
		})

		seed_database()
	} catch (error) {
		console.log(error)
	}
}

init()
