import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	background-color: #111313;
	padding: 0 30px;
	padding-top: 140px;
	align-items: center;
	justify-content: flex-start; /* Change from space-between to flex-start */
`;

export const ContainerTop = styled.View`
	align-items: center;
	width: 100%;
	justify-content: center;
	margin-bottom: 20px; /* Add margin to separate the title and the list */
`;

export const ContainerBottom = styled.View`
	align-items: center;
	width: 100%;
	flex: 1; /* Allow the list to take remaining space */
`;

export const TitleContainer = styled.View`
	align-items: center;
	width: 80%;
	margin-bottom: 10px; /* Reduce margin for a cleaner look */
`;

export const Title = styled.Text`
	font-size: 30px;
	color: #fcf9ff;
	text-align: center;
`;

export const RequestRow = styled.View`
	margin-top: 10px;
	padding: 10px;
	background-color: #292929;
	border-radius: 5px;
	align-items: center;
	margin-bottom: 20px; /* Add margin to separate the list items */
	width: 80%;
`;

export const RequestText = styled.Text`
	color: #fcf9ff;
	font-size: 16px;
`;

export const ButtonContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	flex-direction: row;
	margin-top: 10px;
`;

export const AcceptButton = styled.TouchableOpacity`
	align-items: center;
	background-color: #388e3c;
	padding: 12px;
	width: 40%;
	border-radius: 5px;
	margin-right: 5px;
`;

export const DeclineButton = styled.TouchableOpacity`
	align-items: center;
	background-color: #b71c1c;
	padding: 12px;
	width: 40%;
	border-radius: 5px;
	margin-left: 5px;
`;

export const ButtonText = styled.Text`
	color: #1d1d1d;
	font-size: 16px;
`;
