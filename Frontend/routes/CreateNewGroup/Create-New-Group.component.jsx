import React, {useState, useEffect, useCallback} from 'react';
import {formatDistanceToNow} from 'date-fns';
import {useAuth} from '../../context/authContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchContainer from "../../components/searchContainer/searchContainer.component";
import { GetCategories } from "../../requests/categories";
import { View, StyleSheet } from 'react-native';
import {
    AddUserText,
    SearchBarContainer,
	Container,
	ContainerTop,
	SearchBar,
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
} from './Create-New-Group.styles';
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

const CreateNewGroupPage = ({navigation}) => {
	const [data, setData] = useState([]);
	const {user, token} = useAuth();
	const [users, setUsers] = useState([]);
	const [searchText, setSearchText] = useState(null);

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
		<ButtonContainer
                   onPress={() => {
                    		navigation.navigate('GroupNameAndEnrollment');
                    					}}>
                       <Text>Next</Text>
                       <Ionicons name="arrow-forward" size={24} color="#fcf9ff" />
        			</ButtonContainer>
			 <SearchBarContainer>
                  <Ionicons name="search" size={24} color="black" />
                  <SearchBar
                    placeholder=" Search ..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                  />
                </SearchBarContainer>
                   <Text>Add Users</Text>
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

export default CreateNewGroupPage;
