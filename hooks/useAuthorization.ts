import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export const useAuthorization = () => {
	const auth = useContext(AuthContext);

	return auth;
};
