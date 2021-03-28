import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { Layout } from '../../components/Layouts/Layout'
import { useAuthorization } from '../../hooks/useAuthorization'
import { useNotification } from '../../hooks/useNotification'
import { Button } from '../../ui/components/Button'
import { Input } from '../../ui/components/Input'

const Singin = () => {
	const router = useRouter()
	const auth = useAuthorization()
	const notification = useNotification()
	const emailRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (Boolean(router.query.redirect)) {
			notification.showErrorMessage('Please sign in to view this page')
		}
	}, [router.query])

	useEffect(() => {
		if (auth.signedIn) {
			// router.push('/home')
		}
	}, [auth])

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.target)

		if (formData.get('email') === '' || formData.get('password') === '') {
			notification.showErrorMessage('One or more fields are empty')
			return
		}

		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		}

		auth.signIn(data)
	}

	useEffect(() => {
		emailRef.current?.focus()
	}, [])

	return (
		<Layout title='Sign In'>
			<div className='flex justify-center w-full h-screen px-2 bg-light dark:bg-dark-700 md:px-0'>
				<form onSubmit={handleSubmit} action='submit' className='flex flex-col mt-20 w-96'>
					<span className='my-4 text-5xl italic font-bold text-center text-black dark:text-white'>
						Sign in
					</span>
					<Input label='Email' placeholder='Email' type='email' name='email' ref={emailRef} />
					<Input label='Password' placeholder='Password' type='password' name='password' />
					<div className='flex items-center justify-between w-full py-2 mt-3'>
						<span className='text-black dark:text-white'>
							<span className='mr-2'>Not signed up yet?</span>
							<div className='font-semibold text-brand-400 hover:underline'>
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
