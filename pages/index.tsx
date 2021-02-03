import { Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layouts/Layout'

const Index = () => {
	const router = useRouter()

	// TODO: this will be removed when landing page is added, and redirect bug will be removed
	if (process.browser) {
		router.push('/home')
	}

	return (
		<Layout>
			<div className='flex items-center justify-center w-full h-screen bg-gray-800'>
				<Spinner color='green.500' size='lg' thickness='2px' />
			</div>
		</Layout>
	)
}

export default Index
