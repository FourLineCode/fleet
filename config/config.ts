import { QueryClient } from 'react-query';

const PROD = process.env.NODE_ENV === 'production';

export const config = {
	api: PROD ? '' : 'http://localhost:3000/api',
};

export const queryClient = new QueryClient();
