import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
	const handleSubmit = (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		console.log(formData.get('email'))
		console.log(formData.get('username'))
		console.log(formData.get('displayName'))
		console.log(formData.get('password'))
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
				<label htmlFor='email' className='text-white'>
					Email
				</label>
				<input
					type='email'
					name='email'
					autoComplete='off'
					className='w-full px-2 py-2 rounded focus:outline-none'
				/>
				<label htmlFor='username' className='text-white'>
					Username
				</label>
				<input
					type='text'
					name='username'
					autoComplete='off'
					className='w-full px-2 py-2 rounded focus:outline-none'
				/>
				<label htmlFor='displayName' className='text-white'>
					DisplayName
				</label>
				<input
					type='text'
					name='displayName'
					autoComplete='off'
					className='w-full px-2 py-2 rounded focus:outline-none'
				/>
				<label htmlFor='password' className='text-white'>
					Password
				</label>
				<input
					type='password'
					name='password'
					autoComplete='off'
					className='w-full px-2 py-2 rounded focus:outline-none'
				/>
				<label htmlFor='cpassword' className='text-white'>
					Confirm Password
				</label>
				<input
					type='password'
					name='cpassword'
					autoComplete='off'
					className='w-full px-2 py-2 rounded focus:outline-none'
				/>
				<div className='flex items-center justify-between w-full py-2 mt-3'>
					<span className='text-white'>
						<span className='mr-2'>Have an account?</span>
						<Link to='/signin' className='text-green-400 hover:underline'>
							Sign in
						</Link>
					</span>
					<button
						type='submit'
						className='px-4 py-2 font-semibold text-white transition duration-300 bg-green-600 rounded focus:outline-none hover:bg-green-500'>
						Create an account
					</button>
				</div>
			</form>
		</div>
	)
}

export default Signup
