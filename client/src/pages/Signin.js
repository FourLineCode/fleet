import React from 'react'
import { Link } from 'react-router-dom'

const Singin = () => {
	const handleSubmit = (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		console.log(formData.get('email'))
		console.log(formData.get('password'))
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
				<label htmlFor='email' className='text-white'>
					Email
				</label>
				<input
					type='email'
					name='email'
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
				<div className='flex items-center justify-between w-full py-2 mt-3'>
					<span className='text-white'>
						<span className='mr-2'>Not signed up yet?</span>
						<Link to='/signup' className='text-green-400 hover:underline'>
							Sign up
						</Link>
					</span>
					<button
						type='submit'
						className='px-4 py-2 font-semibold text-white transition duration-300 bg-green-600 rounded focus:outline-none hover:bg-green-500'>
						Sign in
					</button>
				</div>
			</form>
		</div>
	)
}

export default Singin
