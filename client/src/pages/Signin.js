import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signin } from '../store/actions/authActions'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Notification from '../ui/Notification'

const Singin = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)

	const [showError, setShowError] = useState(false)

	useEffect(() => {
		if (auth.signedIn) {
			history.push('/')
		}
	}, [auth])

	useEffect(() => {
		if (auth.error) {
			setShowError(true)
			setTimeout(() => {
				setShowError(false)
			}, 3000)
		}
	}, [auth.error])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)

		if (formData.get('email') === '' || formData.get('password') === '') {
			return
		}

		const data = {
			email: formData.get('email'),
			password: formData.get('password'),
		}

		dispatch(signin(data))
	}

	return (
		<div className='flex justify-center h-screen bg-gray-700'>
			<form
				onSubmit={handleSubmit}
				action='submit'
				className='flex flex-col mt-20 w-96'>
				<span className='my-4 text-5xl italic font-semibold text-center text-white'>
					Sign in
				</span>
				<Input label='Email' type='email' name='email' />
				<Input label='Password' type='password' name='password' />
				<div className='flex items-center justify-between w-full py-2 mt-3'>
					<span className='text-white'>
						<span className='mr-2'>Not signed up yet?</span>
						<Link to='/signup' className='text-green-400 hover:underline'>
							Sign up
						</Link>
					</span>
					<Button type='submit'>Sign in</Button>
				</div>
			</form>
			{showError && <Notification message={auth.error.message} type='error' />}
		</div>
	)
}

export default Singin
