import { CircularProgress } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

const Index = () => {
	const router = useRouter()

	if (process.browser) {
		router.push('/home')
	}

	return (
		<Layout>
			<div className='flex items-center justify-center w-full h-screen bg-gray-800'>
				<CircularProgress color='primary' variant='indeterminate' disableShrink size={30} thickness={4} />
			</div>
		</Layout>
	)
}

export default Index
