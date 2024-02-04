import React, { useState } from "react";
import { Linking, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  ForgotPassword,
  ForgotPasswordText,
  TermsContainer,
  Terms,
  PrivacyLink,
  LoginButton,
  LoginButtonText,
  SignUpButton,
  SignUpButtonText,
  MLogo,
} from "./login.styles";

import { useAuth } from "../../context/authContext";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill all fields");
        return;
      }
      const response = await login({ email: email, password: password });
      if (response) {
        navigation.navigate("Main");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("An error occurred during login. Please try again.");
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const navigateForgetPassword = () => {
    navigation.navigate("Forget");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111313" }}>
      <Container>
        <ContainerTop>
          <TitleContainer>
            <MLogo source={require("../../assets/MLogo/MLogo.png")} />
            <Title>
              Empower{"\n"}Minds{"\n"}Ignite Learning
            </Title>
          </TitleContainer>
          <InputContainer>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#808080"
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="#808080"
            />
            <ForgotPassword onPress={navigateForgetPassword}>
              <ForgotPasswordText>Forgot?</ForgotPasswordText>
            </ForgotPassword>
          </InputContainer>
          <ButtonContainer>
            <LoginButton onPress={handleLogin}>
              <LoginButtonText>Login</LoginButtonText>
            </LoginButton>

            <SignUpButton onPress={navigateToSignUp}>
              <SignUpButtonText>
                Don't have an account? Sign Up
              </SignUpButtonText>
            </SignUpButton>
          </ButtonContainer>
        </ContainerTop>

        <ContainerBottom>
          <TermsContainer>
            <Terms>
              {`By logging in you agree to our `}
              <PrivacyLink
                onPress={() => Linking.openURL("www.killme.com/privacy-policy")}
              >
                privacy policy
              </PrivacyLink>
              {` and `}
              <PrivacyLink
                onPress={() =>
                  Linking.openURL("www.killme.com/terms-of-service")
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

export default LoginPage;
