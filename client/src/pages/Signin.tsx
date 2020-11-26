import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization'
import { signin } from '../store/actions/authActions'
import { setError, setSuccess } from '../store/actions/notificationActions'
import Button from '../ui/Button'
import Input from '../ui/Input'

const Singin = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const auth = useAuthorization()

	useEffect(() => {
		if (auth.signedIn) {
			dispatch(setSuccess('Successfully signed in'))
			history.push('/home')
		}
	}, [auth])

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target)

		if (formData.get('email') === '' || formData.get('password') === '') {
			dispatch(setError('One or more fields are empty'))
			return
		}

		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
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
						<Link
							to='/signup'
							className='text-green-400 hover:underline'>
							Sign up
						</Link>
					</span>
					<Button type='submit'>Sign in</Button>
				</div>
			</form>
		</div>
	)
}

export default Singin
