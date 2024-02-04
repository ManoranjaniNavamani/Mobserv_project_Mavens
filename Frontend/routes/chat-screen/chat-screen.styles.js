// chat.styles.js
import styled from 'styled-components/native';

export const UserList = styled.ScrollView`
	flex: 1;
	width: 100%;
	padding: 20px;
`;

export const ChatContainer = styled.View`
	flex: 1;
	width: 100%;
	padding: 20px;
`;

export const Container = styled.View`
	flex: 1;
	background-color: #111313;
	padding: 0 30px;
	padding-top: 50px;
	align-items: center;
	justify-content: flex-start;
`;

export const ContainerTop = styled.View`
	width: 110%;
	flex-direction: row;
	padding-bottom: 10px;
	padding-left: 10px;
	margin-bottom: 20px;
`;

export const ContainerBottom = styled.View`
	align-items: center;
	width: 100%;
	flex: 1;
`;

export const TitleContainer = styled.View`
	align-items: center;
	width: 80%;
	margin-bottom: 10px;
`;

export const Title = styled.Text`
	font-size: 30px;
	color: #fcf9ff;
	text-align: center;
`;

export const UserListItem = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	background-color: #292929;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 5px;
`;

export const UserRoleAndLastLogin = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const UserDetails = styled.View`
	flex: 1;
	flex-direction: column;
`;

export const UserLastLogin = styled.Text`
	font-size: 16px;
	color: #fcf9ff;
`;

export const UserRoleLoginContainer = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
`;

export const UserName = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
	color: #fcf9ff;
`;

export const UserProfileImage = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	margin-right: 20px;
	align-self: flex-start;
	margin-top: 8px;
`;
export const ChatMessagesContainer = styled.ScrollView`
	flex: 1;
	width: 100%;
	height: 100%;
	margin-bottom: 16px;
	padding: 0 16px;
	flex-direction: 'column-reverse';
`;

export const ChatMessageContainer = styled.View`
	flex-direction: ${({sender, user}) =>
		sender === user ? 'row-reverse' : 'row'};
	margin-bottom: 8px;
`;

export const ChatMessageBubble = styled.View`
	background-color: ${({sender, user}) =>
		sender === user ? '#388e3c' : '#1976D2'};
	padding: 8px;
	padding-left: 15px;
	padding-right: 15px;
	border-radius: 20px;
	max-width: 80%;
`;

export const ChatMessageText = styled.Text`
	color: white;
	font-size: 20px;
`;

export const ChatInputContainer = styled.View`
	flex-direction: row;
	margin-top: 16px;
	align-items: center;
`;

export const ChatTextInput = styled.TextInput`
	flex: 1;
	border-width: 1px;
	padding: 8px;
	margin-right: 8px;
	border-radius: 8px;
	background-color: #fcf9ff;
`;

export const MessageContainer = styled.View`
	flex: 1;
	justify-content: flex-end;
`;

export const SendButton = styled.TouchableOpacity`
	background-color: #1976d2;
	padding: 8px;
	border-radius: 8px;
	justify-content: center;
`;

export const SendButtonText = styled.Text`
	color: white;
`;
