// ProfilePage.js
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../context/authContext';

import {
	ProfileContainer,
	ProfileDetailsContainer,
	ProfileDetail,
	InputContainer,
	Input,
	UpdateButton,
	UpdateButtonText,
} from './profile-page.styles';

const ProfilePage = ({navigation}) => {
	const {user, updateUser} = useAuth();
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);

	const handleUpdateProfile = () => {
		const updatedUser = {...user, firstName, lastName};
		updateUser(updatedUser);
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#111313'}}>
			<ProfileContainer>
				<ProfileDetailsContainer>
					<ProfileDetail>Role: {user.role}</ProfileDetail>
					<ProfileDetail>Email: {user.email}</ProfileDetail>
					<ProfileDetail>Firstname: {user.firstName}</ProfileDetail>
					<ProfileDetail>Lastname: {user.lastName}</ProfileDetail>
					<ProfileDetail>Created At: {user.createdAt}</ProfileDetail>
				</ProfileDetailsContainer>

				<InputContainer>
					<Input
						placeholder="Enter Firstname"
						value={firstName}
						onChangeText={(text) => setFirstName(text)}
						placeholderTextColor="#808080"
					/>
					<Input
						placeholder="Enter Lastname"
						value={lastName}
						onChangeText={(text) => setLastName(text)}
						placeholderTextColor="#808080"
					/>
					<UpdateButton onPress={handleUpdateProfile}>
						<UpdateButtonText>Update Profile</UpdateButtonText>
					</UpdateButton>
				</InputContainer>
			</ProfileContainer>
		</SafeAreaView>
	);
};

export default ProfilePage;
