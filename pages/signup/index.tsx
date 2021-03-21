import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { Layout } from '../../components/Layouts/Layout'
import { useAuthorization } from '../../hooks/useAuthorization'
import { useNotification } from '../../hooks/useNotification'
import { Button } from '../../ui/components/Button'
import { Input } from '../../ui/components/Input'
import { TextArea } from '../../ui/components/TextArea'

const Signup = () => {
	const router = useRouter()
	const emailRef = useRef<HTMLInputElement>(null)
	const notification = useNotification()
	const auth = useAuthorization()

	const [mutate, { data: signUpResponseData }] = useMutation(gql`
		mutation SingnUp($email: String!, $password: String!, $username: String!, $displayName: String!, $bio: Stirng) {
			signUp(email: $email, password: $password, username: $username, displayName: $displayName, bio: $bio) {
				id
			}
		}
	`)

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
			notification.showErrorMessage('One or more fields are empty')
			return
		}

		if (password !== confirmPassword) {
			notification.showErrorMessage('Passwords do not match')
			return
		}

		const data = {
			email: formData.get('email') as string,
			username: formData.get('username') as string,
			displayName: formData.get('displayName') as string,
			bio: formData.get('bio') as string,
			password: formData.get('password') as string,
		}

		try {
			mutate({ variables: data })

			if (signUpResponseData.id) {
				auth.signIn({ email: data.email, password: data.password })

				notification.showSuccessMessage('Successfully signed up')
				router.push('/home')
			}
		} catch (err) {
			if (err.response.data.message.startsWith('E11000')) {
				return notification.showErrorMessage('User already exists with given username')
			}
			notification.showErrorMessage(err.response.data.message)
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
							<div className='font-semibold text-brand-400 hover:underline'>
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
