import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'

const Index = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('/home')
	}, [])

	return <Layout />
}

export default Index
