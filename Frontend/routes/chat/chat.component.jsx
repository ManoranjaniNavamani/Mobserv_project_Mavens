import React, {useState, useEffect, useCallback} from 'react';
import {formatDistanceToNow} from 'date-fns';
import {useAuth} from '../../context/authContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
	Container,
	ContainerTop,
	ContainerBottom,
	TitleContainer,
	Title,
	UserList,
	UserListItem,
	UserProfileImage,
	UserDetails,
	UserName,
	UserRole,
	UserLastLogin,
	UserRoleLoginContainer,
	ButtonContainer,
} from './chat.styles';
import {GetChat} from '../../requests/chat';
import {useFocusEffect} from '@react-navigation/native';

export const formatLastLogin = (lastLogin) => {
	const loginDate = new Date(lastLogin);

	const distanceToNow = formatDistanceToNow(loginDate, {addSuffix: true});

	if (distanceToNow.includes('ago')) {
		return distanceToNow;
	} else {
		return loginDate.toLocaleDateString();
	}
};

const ChatPage = ({navigation}) => {
	const [data, setData] = useState([]);
	const {user, token} = useAuth();

	const handleSelectUser = (sendTo) => {
		navigation.navigate('ChatScreen', {sendTo});
	};

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					if (token) {
						const result = await GetChat(token);
						setData(result);
					}
				} catch (error) {
					console.error('Error fetching Chats:', error.message);
				}
			};

			fetchData();
		}, [token])
	);


	return (
		<Container>
			<ContainerTop>
				<TitleContainer>
					<Title>Your Messages</Title>
				</TitleContainer>
				<ButtonContainer
					onPress={() => {
						navigation.navigate('UserBrowser');
					}}
				>
					<Ionicons name="person-add-outline" size={20} color="#fcf9ff" />

				</ButtonContainer>
				<ButtonContainer
                	onPress={() => {
                		navigation.navigate('GroupChat');
                	}}
                >
                	<Ionicons name="people-outline" size={30} color="#fcf9ff" />
                </ButtonContainer>
			</ContainerTop>
			<ContainerBottom>
				<UserList>
					{data.map((chats) => (
						<UserListItem
							key={chats._id}
							onPress={() => handleSelectUser(chats.users[0])}
						>
							<UserProfileImage source={{uri: chats.users[0].profileImage}} />
							<UserDetails>
								<UserName>
									{chats.users[0].firstName} {chats.users[0].lastName}
								</UserName>
								<UserRoleLoginContainer>
									<UserRole>{chats.users[0].role}</UserRole>
									<UserLastLogin>
										{formatLastLogin(chats.users[0].lastLogin)}
									</UserLastLogin>
								</UserRoleLoginContainer>
							</UserDetails>
						</UserListItem>
					))}
				</UserList>
			</ContainerBottom>
		</Container>
	);
};

export default ChatPage;
