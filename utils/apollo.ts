import { ApolloClient, InMemoryCache } from '@apollo/client';

const prod = process.env.NODE_ENV === 'production';

export const client = new ApolloClient({
	uri: prod ? '' : 'http://localhost:3000/api/graphql',
	cache: new InMemoryCache(),
	ssrMode: !process.browser,
});
