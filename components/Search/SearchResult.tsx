import { useRouter } from 'next/router'
import React from 'react'

const SearchResult = () => {
	const router = useRouter()
	const { query } = router.query

	return (
		<div className='h-full col-span-4 px-1 py-4 mb-8 space-y-4 text-center text-white border-dark-500 md:px-2 lg:px-0 md:col-span-3 xl:col-span-2 md:border-l xl:border-r md:mb-0'>
			{query}
		</div>
	)
}

export default SearchResult
