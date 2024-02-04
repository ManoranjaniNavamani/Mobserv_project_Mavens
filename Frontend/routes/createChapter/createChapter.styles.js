// courseChapterCreation.styles.js
import styled from 'styled-components/native';

export const Container = {
	padding: 30,
	paddingTop: 140,
	alignItems: 'center',
	justifyContent: 'space-between',
};

export const TitleContainer = styled.View`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	width: 60%;
	margin-bottom: 30px;
`;

export const Title = styled.Text`
	font-size: 30px;
	color: #fcf9ff;
`;

export const InputContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 10px;
	position: relative;
`;

export const Input = styled.TextInput`
	border-width: 1px;
	border-color: transparent;
	background-color: #1d1d1d;
	border-radius: 5px;
	padding: 5px 15px;
	margin-bottom: 20px;
	width: 80%;
	color: #a0a0a0;
`;

export const DropdownContainer = styled.View`
	width: 80%;
	margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 12px;
`;

export const CreateButton = styled.TouchableOpacity`
	align-items: center;
	background-color: #e19c97;
	padding: 6px;
	width: 80%;
	border-radius: 5px;
`;

export const CreateButtonText = styled.Text`
	color: #1d1d1d;
	font-size: 14px;
`;
