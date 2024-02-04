import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: #111313;
	padding: 30px;
	align-items: center;
	justify-content: space-between;
`;

export const SearchBar = styled.TextInput`
	width: 100%;
	height: 40px;
	background-color: #292929;
	color: #fcf9ff;
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 5px;
`;

export const UserList = styled.FlatList`
	flex: 1;
	width: 100%;
`;

export const UserListItem = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	background-color: #292929;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 5px;
`;

export const UserProfileImage = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	margin-right: 10px;
`;

export const UserDetails = styled.View`
	flex: 1;
	flex-direction: column;
	border-bottom: 2px solid #ff0000;
`;

export const UserName = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #fcf9ff;
	margin-bottom: 5px;
`;

export const UserRoleAndLastLogin = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const UserRole = styled.Text`
	font-size: 16px;
	color: #fcf9ff;
`;

export const UserLastLogin = styled.Text`
	font-size: 14px;
	color: #fcf9ff;
	align-self: flex-end;
`;

export const UserRoleLoginContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
`;

export const StartChatButton = styled.TouchableOpacity`
	background-color: #1976d2;
	padding: 10px;
	border-radius: 5px;
	align-items: center;
	margin-top: 20px;
`;

export const StartChatButtonText = styled.Text`
	color: #fcf9ff;
	font-size: 18px;
	font-weight: bold;
`;

export const IoniconButton = styled.TouchableOpacity`
	padding: 8px;
	border-radius: 5px;
	background-color: #1976d2;
	margin-left: 10px;
`;
