import {Ionicons} from '@expo/vector-icons';
import {
	TitleBar,
	TitleBarLeft,
	BackgroundContainer,
	Avatar,
	TitleContainer,
	Title,
	Name,
} from './header.styles';
import {TouchableOpacity} from 'react-native';
const Header = ({navigation, firstName, lastName}) => {
	return (
		<TitleBar>
			<TitleBarLeft>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('ProfileMenu');
					}}
				>
					<BackgroundContainer>
						<Avatar source={require('../../assets/faces/avicii.jpeg')} />
					</BackgroundContainer>
				</TouchableOpacity>
				<TitleContainer>
					<Title>Welcome back,</Title>
					<Name>
						{firstName} {lastName}
					</Name>
				</TitleContainer>
			</TitleBarLeft>
			<BackgroundContainer>
				<Ionicons name="notifications-outline" size={20} color={'#E19C97'} />
			</BackgroundContainer>
		</TitleBar>
	);
};

export default Header;
