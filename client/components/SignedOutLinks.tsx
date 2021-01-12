import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const SignedOutLinks = () => {
	return (
		<>
			<Link to='/signup'>
				<Button type='button' variant='filled'>
					Sign up
				</Button>
			</Link>
			<Link to='/signin'>
				<Button type='button' variant='outlined'>
					Sign in
				</Button>
			</Link>
		</>
	)
}

export default SignedOutLinks
