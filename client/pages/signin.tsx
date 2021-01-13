import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import useAuthorization from '../hooks/useAuthorization'
import { signin } from '../store/actions/authActions'
import { setError, setSuccess } from '../store/actions/notificationActions'
import Button from '../ui/Button'
import SocialMediaIllustration from '../ui/Illustrations/SocialMediaIllustration'
import Input from '../ui/Input'

const Singin = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const auth = useAuthorization()

	useEffect(() => {
		if (auth.signedIn) {
			dispatch(setSuccess('Successfully signed in'))
			router.push('/home')
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
		<Layout title='Sign In | Fleet'>
			<div className='flex w-full h-screen bg-gray-700 justify-evenly'>
				<SocialMediaIllustration className='hidden mt-16 h-3/5 md:block' />
				<form onSubmit={handleSubmit} action='submit' className='flex flex-col mt-20 w-96 md:mr-16'>
					<span className='my-4 text-5xl italic font-semibold text-center text-white'>Sign in</span>
					<Input label='Email' type='email' name='email' />
					<Input label='Password' type='password' name='password' />
					<div className='flex items-center justify-between w-full py-2 mt-3'>
						<span className='text-white'>
							<span className='mr-2'>Not signed up yet?</span>
							<div className='text-green-400 hover:underline'>
								<Link href='/signup'>Sign up</Link>
							</div>
						</span>
						<Button variant='filled' type='submit'>
							Sign in
						</Button>
					</div>
				</form>
			</div>
		</Layout>
	)
}

export default Singin
