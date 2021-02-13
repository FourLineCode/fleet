import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layouts/Layout'
import { signin } from '../../store/actions/authActions'
import { setError, setSuccess } from '../../store/actions/notificationActions'
import Button from '../../ui/components/Button'
import Input from '../../ui/components/Input'
import TextArea from '../../ui/components/TextArea'
import { BASE_URL } from '../../utils/config'

const Signup = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const emailRef = useRef<HTMLInputElement>(null)

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
				router.push('/home')
			}
		} catch (err) {
			if (err.response.data.message.startsWith('E11000')) {
				return dispatch(setError('User already exists with given username'))
			}
			dispatch(setError(err.response.data.message))
		}
	}

	useEffect(() => {
		emailRef.current?.focus()
	}, [])

	return (
		<Layout title='Sign Up'>
			<div className='flex justify-center w-full h-screen px-2 bg-light dark:bg-dark-700 md:px-0'>
				<form onSubmit={handleSubmit} action='submit' className='flex flex-col mt-8 w-96'>
					<span className='my-4 text-5xl italic font-bold text-center text-black dark:text-white'>
						Sign up
					</span>
					<Input label='Email' placeholder='Email' type='email' name='email' ref={emailRef} />
					<Input label='Username' placeholder='Username' type='text' name='username' />
					<Input label='Display Name' placeholder='Display Name' type='text' name='displayName' />
					<Input label='Password' placeholder='Password' type='password' name='password' />
					<Input label='Confirm Password' placeholder='Confirm Password' type='password' name='cpassword' />
					<TextArea label='Bio (optional)' placeholder='Bio' name='bio' />
					<div className='flex items-center justify-between w-full py-2 mt-3'>
						<span className='text-black dark:text-white'>
							<span className='mr-2'>Have an account?</span>
							<div className='text-brand-400 hover:underline'>
								<Link href='/signin'>Sign in</Link>
							</div>
						</span>
						<Button variant='filled' type='submit'>
							Create an account
						</Button>
					</div>
				</form>
			</div>
		</Layout>
	)
}

export default Signup
