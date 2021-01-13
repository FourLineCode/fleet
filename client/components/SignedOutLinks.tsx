import Link from 'next/link'
import React from 'react'
import Button from '../ui/Button'

const SignedOutLinks = () => {
	return (
		<>
			<Link href='/signup'>
				<Button type='button' variant='filled'>
					Sign up
				</Button>
			</Link>
			<Link href='/signin'>
				<Button type='button' variant='outlined'>
					Sign in
				</Button>
			</Link>
		</>
	)
}

export default SignedOutLinks
