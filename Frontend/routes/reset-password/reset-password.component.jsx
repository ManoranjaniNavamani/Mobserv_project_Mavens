import React, {useState} from 'react';
import {Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
	forgotpassword,
	resetpassword,
	userLogin,
	userSignUp,
} from '../../requests/user';

import {
	Container,
	ContainerTop,
	ContainerBottom,
	TitleContainer,
	Title,
	InputContainer,
	ButtonContainer,
	Input,
	TermsContainer,
	Terms,
	PrivacyLink,
	SignUpButton,
	SignUpButtonText,
} from './reset-password.styles';

const ResetPasswordPage = ({navigation}) => {
	const [newPassword, setNewPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [otp, setOtp] = useState('');

	const handleResetPassword = async () => {
		if (newPassword != passwordConfirm) {
			alert(`Passwords don't match`);
		}
		const response = await resetpassword({otp, newPassword});
		if (response) {
			alert('Passowrd changed successfully');
			navigation.navigate('Login');
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
							placeholder="OTP"
							autoCapitalize="none"
							value={otp}
							onChangeText={(text) => setOtp(text)}
							placeholderTextColor="#808080"
						/>
						<Input
							placeholder="new password"
							autoCapitalize="none"
							value={newPassword}
							onChangeText={(text) => setNewPassword(text)}
							placeholderTextColor="#808080"
						/>
						<Input
							placeholder="confirm new password"
							autoCapitalize="none"
							value={passwordConfirm}
							onChangeText={(text) => setPasswordConfirm(text)}
							placeholderTextColor="#808080"
						/>
					</InputContainer>
					<ButtonContainer>
						<SignUpButton onPress={handleResetPassword}>
							<SignUpButtonText>Reset Password</SignUpButtonText>
						</SignUpButton>
					</ButtonContainer>
				</ContainerTop>

				<ContainerBottom>
					<TermsContainer>
						<Terms>
							By logging in you agree to our{' '}
							<PrivacyLink
								onPress={() => Linking.openURL('www.killme.com/privacy-policy')}
							>
								privacy policy
							</PrivacyLink>
							and
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

export default ResetPasswordPage;
