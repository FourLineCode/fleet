import { useRouter } from 'next/router'
import { Button } from '../../ui/components/Button'

export const SignedOutLinks = () => {
	const router = useRouter()

	return (
		<>
			<Button onClick={() => router.push('/signup')} type='button' variant='filled'>
				Sign up
			</Button>
			<Button onClick={() => router.push('/signin')} type='button' variant='outlined'>
				Sign in
			</Button>
		</>
	)
}
