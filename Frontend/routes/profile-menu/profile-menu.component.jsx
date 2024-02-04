import React from 'react';
import {SafeAreaView} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {
	LogoutButton,
	LogoutButtonText,
	ProfileContainer,
	ProfileInfoContainer,
	UserProfileIcon,
	ProfileInfoText,
	ProfileSectionContainer,
	ProfileTop,
	SectionText,
} from './profile-menu.styles';
import {useAuth} from '../../context/authContext';

const backgroundColor = '#111313';

const ProfileMenuPage = ({navigation}) => {
	const {user, logout} = useAuth();

	const handleLogout = () => {
		navigation.navigate('Login');
		logout();
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor}}>
			<ProfileContainer>
				<ProfileTop>
					<ProfileInfoContainer>
						<ProfileInfoText>{user ? user.firstName : ''}</ProfileInfoText>
						<ProfileInfoText>{user ? user.lastName : ''}</ProfileInfoText>
						<ProfileInfoText>{user ? user.email : ''}</ProfileInfoText>
					</ProfileInfoContainer>

					<ProfileSectionContainer
						onPress={() => navigation.navigate('Profile')}
					>
						<FontAwesome5 name={'user'} size={24} color="#fcf9ff" />
						<SectionText>{'Profile'}</SectionText>
					</ProfileSectionContainer>

					{user?.role === 'admin' ? (
						<ProfileSectionContainer
							onPress={() => navigation.navigate('ManageRequests')}
						>
							<FontAwesome5
								name={'chalkboard-teacher'}
								size={24}
								color="#fcf9ff"
							/>
							<SectionText>{'Manage Teacher Requests'}</SectionText>
						</ProfileSectionContainer>
					) : (
						<ProfileSectionContainer
							onPress={() => navigation.navigate('BecomeTeacher')}
						>
							<FontAwesome5
								name={'chalkboard-teacher'}
								size={24}
								color="#fcf9ff"
							/>
							<SectionText>{'Become a teacher'}</SectionText>
						</ProfileSectionContainer>
					)}

					<ProfileSectionContainer
						onPress={() => navigation.navigate('Settings')}
					>
						<FontAwesome5 name={'cog'} size={24} color="#fcf9ff" />
						<SectionText>{'Settings'}</SectionText>
					</ProfileSectionContainer>

					<LogoutButton onPress={handleLogout}>
						<LogoutButtonText>Logout</LogoutButtonText>
					</LogoutButton>
				</ProfileTop>
			</ProfileContainer>
		</SafeAreaView>
	);
};

export default ProfileMenuPage;
