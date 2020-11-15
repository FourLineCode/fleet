import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Notification from '../ui/Notification'
import { BASE_URL } from '../config'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signin } from '../store/actions/authActions'

const Signup = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	const [error, setError] = useState(null)
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		if (error && !showError) {
			setShowError(true)
			const timeout = setTimeout(() => {
				setShowError(false)
				setError(null)
			}, 3000)
		}
	}, [error])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)

		const password = formData.get('password')
		const confirmPassword = formData.get('cpassword')

		if (
			formData.get('email') === '' ||
			formData.get('username') === '' ||
			formData.get('displayName') === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			setError('One or more fields are empty')
			return
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		const data = {
			email: formData.get('email'),
			username: formData.get('username'),
			displayName: formData.get('displayName'),
			password: formData.get('password'),
		}

		try {
			const response = await axios.post(`${BASE_URL}/user/signup`, data)
			const { success } = response.data
			if (success) {
				dispatch(signin(data))
				history.push('/home')
			}
		} catch (err) {
			if (err.response.data.message.startsWith('E11000')) {
				return setError('User already exists with given username')
			}
			setError(err.response.data.message)
		}
	}

	return (
		<div className='flex justify-center h-screen bg-gray-700'>
			<form
				onSubmit={handleSubmit}
				action='submit'
				className='flex flex-col mt-20 w-96'>
				<span className='my-4 text-5xl italic font-semibold text-center text-white'>
					Sign up
				</span>
				<Input label='Email' type='email' name='email' />
				<Input label='Username' type='text' name='username' />
				<Input label='Display Name' type='text' name='displayName' />
				<Input label='Password' type='password' name='password' />
				<Input label='Confirm Password' type='password' name='cpassword' />
				<div className='flex items-center justify-between w-full py-2 mt-3'>
					<span className='text-white'>
						<span className='mr-2'>Have an account?</span>
						<Link to='/signin' className='text-green-400 hover:underline'>
							Sign in
						</Link>
					</span>
					<Button type='submit'>Create an account</Button>
				</div>
			</form>
			{showError && <Notification message={error} type='error' />}
		</div>
	)
}

export default Signup
