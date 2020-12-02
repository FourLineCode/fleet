import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { BASE_URL } from '../config'
import { signin } from '../store/actions/authActions'
import { setError, setSuccess } from '../store/actions/notificationActions'
import Button from '../ui/Button'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'

const Signup = () => {
	const history = useHistory()
	const dispatch = useDispatch()

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
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
			dispatch(setError('One or more fields are empty'))
			return
		}

		if (password !== confirmPassword) {
			dispatch(setError('Passwords do not match'))
			return
		}

		const data = {
			email: formData.get('email') as string,
			username: formData.get('username') as string,
			displayName: formData.get('displayName') as string,
			bio: formData.get('bio'),
			password: formData.get('password') as string,
		}

		try {
			const response = await axios.post(`${BASE_URL}/user/signup`, data)
			const { success } = response.data
			if (success) {
				dispatch(signin({ email: data.email, password: data.password }))
				dispatch(setSuccess('Successfully signed up'))
				history.push('/home')
			}
		} catch (err) {
			if (err.response.data.message.startsWith('E11000')) {
				return dispatch(
					setError('User already exists with given username')
				)
			}
			dispatch(setError(err.response.data.message))
		}
	}

	return (
		<div className='flex justify-center h-screen bg-gray-700'>
			<form
				onSubmit={handleSubmit}
				action='submit'
				className='flex flex-col mt-8 w-96'>
				<span className='my-4 text-5xl italic font-semibold text-center text-white'>
					Sign up
				</span>
				<Input label='Email' type='email' name='email' />
				<Input label='Username' type='text' name='username' />
				<Input label='Display Name' type='text' name='displayName' />
				<Input label='Password' type='password' name='password' />
				<Input
					label='Confirm Password'
					type='password'
					name='cpassword'
				/>
				<TextArea label='Bio (optional)' name='bio' />
				<div className='flex items-center justify-between w-full py-2 mt-3'>
					<span className='text-white'>
						<span className='mr-2'>Have an account?</span>
						<Link
							to='/signin'
							className='text-green-400 hover:underline'>
							Sign in
						</Link>
					</span>
					<Button variant='filled' type='submit'>
						Create an account
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Signup
