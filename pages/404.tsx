import React from 'react'
import Layout from '../components/Layouts/Layout'
import NotFoundIllustration from '../ui/Illustrations/NotFoundIllustration'

const NotFound = () => {
	return (
		<Layout title='404 Not Found'>
			<div className='flex items-center justify-center w-full h-screen bg-dark-800'>
				<NotFoundIllustration className='w-full h-full mx-2 sm:mx-0 sm:w-1/2 sm:h-1/2' />
			</div>
		</Layout>
	)
}

export default NotFound
