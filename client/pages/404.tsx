import React from 'react'
import Layout from '../components/Layout'
import NotFoundIllustration from '../ui/Illustrations/NotFoundIllustration'

const NotFound = () => {
	return (
		<Layout title='404 Not Found'>
			<div className='flex items-center justify-center w-full h-screen bg-gray-800'>
				<NotFoundIllustration className='w-1/2 h-1/2' />
			</div>
		</Layout>
	)
}

export default NotFound
