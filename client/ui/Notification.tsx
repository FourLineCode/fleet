import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React, { useEffect, useState } from 'react'

type NotificationTypes = 'success' | 'info' | 'warning' | 'error'

const Alert = (props: AlertProps) => {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}
interface NotificationProps {
	message: string
	type: NotificationTypes
}

const Notification = ({ message, type = 'error' }: NotificationProps) => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(true)
	}, [])

	const handleClose = (event: any, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<div>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={type}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default Notification
