import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { notFound, errorHandler } from './middlewares/error'
import routes from './api'
import seed_database from './seed'

require('dotenv').config()

const app = express()

const init = async () => {
	app.use(express.json())
	app.use(cors())
	app.use(morgan('dev'))
	app.use(helmet())
	app.use(cookieParser())

	await mongoose.connect(
		process.env.MONGO_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
		console.log('MongoDB connected ...')
	)

	app.get('/', (req, res) => {
		res.send({
			message: 'Welcome!',
		})
	})

	app.use('/api', routes)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5000
	await app.listen(
		PORT,
		console.log(`Server started on http://localhost:${PORT}...`)
	)

	seed_database()
}

init()
