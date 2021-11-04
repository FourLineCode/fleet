export const PROD = process.env.NODE_ENV === 'production';

export const config = {
	api: PROD ? 'http://localhost:3000/api' : 'http://localhost:3000/api',
	iconUrl: 'https://i.ibb.co/vZmHrm2/fleet-cropped.png',
};
