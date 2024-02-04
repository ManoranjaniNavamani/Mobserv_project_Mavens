import React, {useState, useEffect} from 'react';
import {getUsers} from '../../requests/user';
import {Ionicons} from '@expo/vector-icons';
import {
	Container,
	SearchBar,
	UserList,
	UserListItem,
	UserProfileImage,
	UserDetails,
	UserName,
	UserRoleAndLastLogin,
	UserRole,
	UserLastLogin,
	UserRoleLoginContainer,
	StartChatButton,
	StartChatButtonText,
	IoniconButton,
} from './user-browser.styles';
import {useAuth} from '../../context/authContext';
import {useFocusEffect} from '@react-navigation/native';

const UserBrowserPage = ({navigation}) => {
	const [users, setUsers] = useState([]);
	const [searchText, setSearchText] = useState(null);
	const {token} = useAuth();

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					if (token) {
						const result = await getUsers(token, searchText);
						setUsers(result);
					}
				} catch (error) {
					console.error('Error fetching users:', error.message);
				}
			};

			fetchData();
		}, [token, searchText])
	);

	const handleStartChat = (sendTo) => {
		navigation.navigate('ChatScreen', {sendTo});
	};

	return (
		<Container>
			<SearchBar
				placeholder="Search users..."
				value={searchText}
				onChangeText={(text) => setSearchText(text)}
			/>
			<UserList
				data={users}
				keyExtractor={(item) => item._id}
				renderItem={({item}) => (
					<UserListItem
						onPress={() => {
							console.log('User selected:', item);
						}}
					>
						<UserProfileImage source={{uri: item.profileImage}} />
						<UserDetails>
							<UserName>
								{item.firstName} {item.lastName}
							</UserName>
							<UserRoleLoginContainer>
								<UserRole>{item.role}</UserRole>
							</UserRoleLoginContainer>
						</UserDetails>
						<IoniconButton
							onPress={() => {
								handleStartChat(item);
							}}
						>
							<Ionicons name="chatbox-outline" size={24} color="#fcf9ff" />
						</IoniconButton>
					</UserListItem>
				)}
			/>
		</Container>
	);
};

export default UserBrowserPage;
