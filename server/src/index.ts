import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import routes from './api'
import { errorHandler, notFound } from './middlewares/error'
import seed_database from './seed'

require('dotenv').config()

const app = express()

const init = async () => {
	try {
		app.use(express.json())
		app.use(cors({ origin: process.env.ORIGIN }))
		app.use(morgan('dev'))
		app.use(helmet())
		app.use(cookieParser())

		await createConnection()

		app.get('/', (req, res) => {
			res.send({
				message: 'Welcome!',
			})
		})

		app.use('/api', routes)

		app.use(notFound)
		app.use(errorHandler)

		const PORT = process.env.PORT || 5000
		await app.listen(PORT, () => {
			console.log(`\nServer started on http://localhost:${PORT}...\n`)
		})

		seed_database()
	} catch (error) {
		console.log(error)
	}
}

init()
