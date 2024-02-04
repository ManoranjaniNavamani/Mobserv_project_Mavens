import styled from 'styled-components/native';

const backgroundColor = '#111313';
const textColor = '#fcf9ff';
const buttonColor = '#e19c97';

export const ProfileContainer = styled.View`
	flex: 1;
	background-color: ${backgroundColor};
	padding: 30px;
	align-items: center;
	justify-content: space-between;
`;

export const ProfileTop = styled.View`
	flex: 1;
	align-items: center;
	width: 100%;
`;

export const ProfileInfoContainer = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 20px;
`;

export const UserProfileIcon = styled.Image`
	width: 40px;
	height: 40px;
	border-radius: 20px; // Adjust this for circular shape
	margin-right: 10px;
`;

export const ProfileInfoText = styled.Text`
	font-size: 24px;
	color: ${textColor};
`;

export const ProfileSectionContainer = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 12px;
	width: 80%;
	margin-top: 10px;
	border-bottom-width: 1px;
	border-bottom-color: #333333;
`;

export const SectionText = styled.Text`
	color: ${textColor};
	font-size: 16px;
	margin-left: 10px;
`;

export const LogoutButton = styled.TouchableOpacity`
	align-items: center;
	background-color: ${buttonColor};
	padding: 12px;
	width: 80%;
	border-radius: 5px;
	margin-top: 20px;
`;

export const LogoutButtonText = styled.Text`
	color: ${backgroundColor};
	font-size: 16px;
`;
