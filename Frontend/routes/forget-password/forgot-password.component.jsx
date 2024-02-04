import React, {useState} from 'react';
import {Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {forgotpassword, userLogin, userSignUp} from '../../requests/user';

import {
	Container,
	ContainerTop,
	ContainerBottom,
	TitleContainer,
	MContainer,
	Title,
	InputContainer,
	ButtonContainer,
	Input,
	TermsContainer,
	Terms,
	PrivacyLink,
	LoginButton,
	LoginButtonText,
	SignUpButton,
	SignUpButtonText,
} from './forgot-password.styles';

const ForgotPasswordPage = ({navigation}) => {
	const [email, setEmail] = useState('');

	const handleSendEmail = async () => {
		const response = await forgotpassword({email});

		if (response) {
			alert('OTP has been sent to your email');
			navigation.navigate('Reset');
		} else {
			alert('unexpected error occured, please try again later');
		}
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#111313'}}>
			<Container>
				<ContainerTop>
					<TitleContainer>
						{/* <MContainer /> */}
						<Title>
							Empower{'\n'}Minds{'\n'}Ignite Learning
						</Title>
					</TitleContainer>
					<InputContainer>
						<Input
							placeholder="email"
							autoCapitalize="none"
							value={email}
							onChangeText={(text) => setEmail(text)}
							placeholderTextColor="#808080"
						/>
					</InputContainer>
					<ButtonContainer>
						<SignUpButton onPress={handleSendEmail}>
							<SignUpButtonText>Send OTP</SignUpButtonText>
						</SignUpButton>
					</ButtonContainer>
				</ContainerTop>

				<ContainerBottom>
					<TermsContainer>
						<Terms>
							{`By logging in you agree to our `}
							<PrivacyLink
								onPress={() => Linking.openURL('www.killme.com/privacy-policy')}
							>
								privacy policy
							</PrivacyLink>
							{` and `}
							<PrivacyLink
								onPress={() =>
									Linking.openURL('www.killme.com/terms-of-service')
								}
							>
								terms of service
							</PrivacyLink>
						</Terms>
					</TermsContainer>
				</ContainerBottom>
			</Container>
		</SafeAreaView>
	);
};

export default ForgotPasswordPage;
