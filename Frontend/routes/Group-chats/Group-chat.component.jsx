import React, {useState, useEffect, useCallback} from 'react';
import {formatDistanceToNow} from 'date-fns';
import {useAuth} from '../../context/authContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchContainer from "../../components/searchContainer/searchContainer.component";
import { GetCategories } from "../../requests/categories";
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
	Text,
} from './Group-chat.styles';
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

const GroupChatPage = ({navigation}) => {
	const [data, setData] = useState([]);
	const {user, token} = useAuth();
    const [categoriesData, setCategories] = useState([]);

	const handleSelectUser = (sendTo) => {
		navigation.navigate('GroupChatScreen', {sendTo});
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
					console.error('Error fetching GroupChat:', error.message);
				}
			};

			fetchData();
		}, [token])
	);


	return (
		<Container>
		<TitleContainer>
             <Title>Group Chats</Title>
              </TitleContainer>
			<ContainerTop>

			      <SearchContainer categories={categoriesData} />
			</ContainerTop>
			<ButtonContainer
            	onPress={() => {
            		navigation.navigate('CreateNewGroup');
            					}}
            >
            <Ionicons name="people-outline" size={20} color="#fcf9ff" />
               <Text>Create New Group</Text>
			</ButtonContainer>
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

export default GroupChatPage;
