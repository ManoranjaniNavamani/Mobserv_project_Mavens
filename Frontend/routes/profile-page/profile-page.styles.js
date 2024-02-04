// profile.styles.js
import styled from 'styled-components/native';

export const ProfileContainer = styled.View`
	flex: 1;
	background-color: #111313;
	padding: 20px;
	align-items: center;
	justify-content: space-between;
`;

export const ProfileDetailsContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const ProfileDetail = styled.Text`
	font-size: 18px;
	color: #fcf9ff;
	margin-bottom: 10px;
`;

export const InputContainer = styled.View`
	width: 100%;
	margin-top: 20px;
`;

export const Input = styled.TextInput`
	border-width: 1px;
	border-color: transparent;
	background-color: #1d1d1d;
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 20px;
	width: 100%;
	color: #a0a0a0;
`;

export const UpdateButton = styled.TouchableOpacity`
	align-items: center;
	background-color: #e19c97;
	padding: 12px;
	width: 100%;
	border-radius: 5px;
`;

export const UpdateButtonText = styled.Text`
	color: #1d1d1d;
	font-size: 16px;
`;
