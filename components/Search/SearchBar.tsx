import { useRouter } from 'next/router'
import React from 'react'

const SearchBar = () => {
	const router = useRouter()

	const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		const formData = new FormData(e.target)
		const query = formData.get('query')

		router.push(`/search?query=${query}`)
	}

	return (
		<form onSubmit={onSubmit}>
			<input
				type='text'
				name='query'
				className='w-48 px-2 py-1 text-black transition-all border border-gray-500 rounded-lg focus:w-72 dark:bg-gray-700 dark:text-white focus:ring-4 ring-brand-500 focus:outline-none'
				placeholder='Search...'
				autoComplete='off'
			/>
		</form>
	)
}

export default SearchBar
