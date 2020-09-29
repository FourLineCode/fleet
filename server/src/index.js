import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { notFound, errorHandler } from './middlewares/error'
import route from './api/route'

require('dotenv').config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(cookieParser())

app.get('/', (req, res) => {
	res.send({
		message: 'Welcome!',
	})
})

app.use('/api', route)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on http://localhost:${PORT}...`))
