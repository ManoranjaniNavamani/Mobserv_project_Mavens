import styled from 'styled-components/native';
import {SvgUri} from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Container = styled.View`
	flex: 1;
	background-color: #111313;
	padding: 30px;
	align-items: center;
	justify-content: center;
`;

export const TitleContainer = styled.View`
	align-items: flex-start;
	margin-bottom: 20px;
`;

export const MLogo = styled(SvgUri)`
	width: 100px;
	height: 80px;
	z-index: 100;
`;

export const Title = styled.Text`
	font-size: 24px;
	color: #fcf9ff;
`;

export const InputContainer = styled.View`
	width: 100%;
	margin-bottom: 20px;
`;

export const ReviewInput = styled.TextInput`
	border-width: 1px;
	border-color: transparent;
	background-color: #1d1d1d;
	border-radius: 5px;
	padding: 10px;
	color: #a0a0a0;
	height: 150px;
`;

export const RatingContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
`;

export const StarIcon = styled(Ionicons)`
	margin-right: 5px;
`;

export const SubmitButton = styled.TouchableOpacity`
	align-items: center;
	background-color: #e19c97;
	padding: 10px;
	width: 80%;
	border-radius: 5px;
`;

export const SubmitButtonText = styled.Text`
	color: #1d1d1d;
	font-size: 16px;
`;
