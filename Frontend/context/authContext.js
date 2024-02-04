import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../requests/user';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const checkUser = async () => {
			try {
				const storedUser = await AsyncStorage.getItem('user');
				if (storedUser) {
					const user = JSON.parse(storedUser);
					setUser(user);
					setToken(user.token);
				}
			} catch (error) {
				console.error('Error loading user from AsyncStorage:', error.message);
			}
		};

		checkUser();
	}, []);

	const login = async (userData) => {
		try {
			const response = await userLogin(userData);
			await AsyncStorage.setItem('user', JSON.stringify(response));
			await AsyncStorage.setItem('userToken', response.token);

			setUser(response);
			setToken(response.token);

			return response;
		} catch (error) {
			console.error('Login error:', error.message);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await AsyncStorage.removeItem('user');
			await AsyncStorage.removeItem('userToken');

			setUser(null);
		} catch (error) {
			console.error('Logout error:', error.message);
			throw error;
		}
	};

	return (
		<AuthContext.Provider value={{user, login, token, logout}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
