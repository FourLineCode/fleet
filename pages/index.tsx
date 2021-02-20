import { Alert, AlertIcon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layouts/Layout'
import Button from '../ui/components/Button'

const Index = () => {
	const router = useRouter()

	return (
		<Layout>
			<div className='flex items-center justify-center w-full h-screen px-2 bg-light dark:bg-dark-800 md:px-0'>
				<div className='w-full space-y-3 text-center md:w-1/2 lg:w-1/3'>
					<div>
						<h1 className='text-6xl font-bold text-brand-500'>Fleet</h1>
						<div className='text-3xl font-semibold text-gray-600 dark:text-gray-400'>
							<h3>Fleet helps you connect</h3>
							<h3>and share with your friends.</h3>
						</div>
					</div>
					<Button onClick={() => router.push('/signup')}>Sign up now</Button>
					<Alert status='warning'>
						<AlertIcon />
						This is a supporter preview for this app. This app is still in development and everything is
						subjected to change at any point. Make sure to report any bugs encountered at
						akmal3535.ah@gmail.com
					</Alert>
				</div>
			</div>
		</Layout>
	)
}

export default Index
