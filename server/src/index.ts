import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
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

		await mongoose.connect(
			process.env.MONGO_URI!,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			},
			() => {
				console.log('MongoDB connected ...')
			}
		)

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
			console.log(`Server started on http://localhost:${PORT}...`)
		})

		seed_database()
	} catch (error) {
		console.log(error)
	}
}

init()
