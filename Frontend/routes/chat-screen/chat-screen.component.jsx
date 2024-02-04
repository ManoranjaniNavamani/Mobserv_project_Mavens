import React, {useEffect, useState} from 'react';
import {
	Container,
	UserName,
	UserDetails,
	ChatMessagesContainer,
	ChatMessageContainer,
	ChatMessageBubble,
	ChatMessageText,
	ChatInputContainer,
	ChatTextInput,
	SendButton,
	SendButtonText,
	UserProfileImage,
	ContainerTop,
	MessageContainer,
	UserLastLogin,
} from './chat-screen.styles';
import {useAuth} from '../../context/authContext';
import {getMessages, sendMessage} from '../../requests/messages';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {formatDistanceToNow} from 'date-fns';
import {getUserById} from '../../requests/user';

export const formatLastLogin = (lastLogin) => {
	try {
		const loginDate = new Date(lastLogin);

		const distanceToNow = formatDistanceToNow(loginDate, {addSuffix: true});

		if (distanceToNow.includes('ago')) {
			return distanceToNow;
		} else {
			return loginDate.toLocaleDateString();
		}
	} catch (err) {
		return '';
	}
};

const ChatScreen = ({navigation}) => {
	const [messages, setMessages] = useState([]);
	const [sendToUser, setSendToUser] = useState('');
	const [newMessage, setNewMessage] = useState('');
	const {user, token} = useAuth();
	const route = useRoute();
	const {sendTo} = route.params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setSendToUser(sendTo);
				const users = [sendTo._id, user._id];
				const result = await getMessages(token, users);
				setMessages(result);
			} catch (error) {
				console.error('Error fetching data:', error.message);
			}
		};

		if (sendTo) {
			fetchData();
		}
	}, [sendTo]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (sendToUser !== '') {
					const userResult = await getUserById(token, sendToUser._id);
					setSendToUser(userResult);
				}

				const users = [sendToUser._id, user._id];
				const result = await getMessages(token, users);
				setMessages(result);
			} catch (error) {
				console.error('Error fetching data:', error.message);
			}
		};

		const intervalId = setInterval(() => {
			if (token && sendToUser !== '') {
				fetchData();
			}
		}, 3000);

		return () => clearInterval(intervalId);
	}, [token, sendToUser, user._id]);

	const handleSend = async () => {
		const payload = {text: newMessage, users: [user._id, sendToUser._id]};
		const sentMessage = await sendMessage(token, payload);

		if (sentMessage) {
			if (newMessage.trim() !== '') {
				setMessages([...messages, sentMessage]);
				setNewMessage('');
			}
		}
	};

	return (
		<Container>
			<ContainerTop>
				<UserProfileImage source={{uri: sendToUser.profileImage}} />
				<UserDetails>
					<UserName>
						{sendToUser.firstName} {sendToUser.lastName}
					</UserName>
					<UserLastLogin>
						{sendToUser?.isOnline
							? 'Online'
							: formatLastLogin(sendToUser.lastLogin)}
					</UserLastLogin>
				</UserDetails>
			</ContainerTop>
			<ChatMessagesContainer>
				<MessageContainer>
					{messages.map((message) => (
						<ChatMessageContainer
							key={message._id}
							sender={message.sender}
							user={user._id}
						>
							<ChatMessageBubble sender={message.sender} user={user._id}>
								<ChatMessageText>{message.text}</ChatMessageText>
							</ChatMessageBubble>
						</ChatMessageContainer>
					))}
				</MessageContainer>
			</ChatMessagesContainer>
			<ChatInputContainer>
				<ChatTextInput
					placeholder="Type a message..."
					value={newMessage}
					onChangeText={(text) => setNewMessage(text)}
				/>
				<SendButton onPress={handleSend}>
					<SendButtonText>Send</SendButtonText>
				</SendButton>
			</ChatInputContainer>
		</Container>
	);
};

export default ChatScreen;
