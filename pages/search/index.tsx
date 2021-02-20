import React from 'react'
import ProtectedLayout from '../../components/Layouts/ProtectedLayout'
import Menu from '../../components/Navigation/Menu'
import Recommend from '../../components/Recommend/Recommend'
import SearchResult from '../../components/Search/SearchResult'

const Search = () => {
	return (
		<ProtectedLayout title='Search'>
			<div className='grid min-h-screen grid-cols-4 bg-light dark:bg-dark-800 gap-x-1 xl:gap-x-4'>
				<Menu />
				<SearchResult />
				<Recommend />
			</div>
		</ProtectedLayout>
	)
}

export default Search
