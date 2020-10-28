import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useEffect } from 'react'

const Alert = (props) => {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const Notification = ({ message }) => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(true)
	}, [])

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<div>
			<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='error'>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default Notification
