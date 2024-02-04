import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: #111313;
	padding: 0 30px;
	padding-top: 140px;
	align-items: center;
	justify-content: space-between;
`;

export const ContainerTop = styled.View`
	flex: 1;
	align-items: center;
	width: 100%;
`;

export const ContainerBottom = styled.View`
	align-items: center;
	width: 100%;
`;

export const TitleContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80%;
	margin-bottom: 30px;
`;

export const Title = styled.Text`
	font-size: 30px;
	color: #fcf9ff;
	text-align: center;
`;

export const InputContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 20px;
`;

export const Input = styled.TextInput`
	border-width: 1px;
	border-color: transparent;
	background-color: #1d1d1d;
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 20px;
	width: 80%;
	color: #a0a0a0;
`;

export const ButtonContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 12px;
`;

export const SendRequestButton = styled.TouchableOpacity`
	align-items: center;
	background-color: #e19c97;
	padding: 12px;
	width: 80%;
	border-radius: 5px;
`;

export const SendRequestButtonText = styled.Text`
	color: #1d1d1d;
	font-size: 16px;
`;

export const TermsContainer = styled.View`
	width: 80%;
`;

export const Terms = styled.Text`
	font-size: 14px;
	color: gray;
	text-align: center;
`;

export const PrivacyLink = styled.Text`
	color: #ffeceb;
	font-weight: bold;
`;

export const BackToLoginButton = styled.TouchableOpacity`
	margin-top: 20px;
`;

export const BackToLoginButtonText = styled.Text`
	color: #6b6b6b;
	font-size: 16px;
`;

export const LatestRequestRow = styled.View`
	margin-top: 10px;
	padding: 10px;
	background-color: #292929;
	border-radius: 5px;
	align-items: center;
	margin-bottom: 30px;
`;

export const LatestRequestText = styled.Text`
	color: #fcf9ff;
	font-size: 16px;
`;
