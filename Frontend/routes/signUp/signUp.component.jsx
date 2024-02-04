// SignUpPage.js
import React, { useState } from "react";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { userSignUp } from "../../requests/user";
import {
  Container,
  ContainerTop,
  ContainerBottom,
  TitleContainer,
  Title,
  InputContainer,
  ButtonContainer,
  Input,
  SignUpButton,
  SignUpButtonText,
  LoginButton,
  LoginButtonText,
} from "./signUp.styles";

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async () => {
    try {
      if (!email || !password || !firstName || !lastName) {
        alert("Please fill all fields");
        return;
      }

      const response = await userSignUp({
        firstName,
        lastName,
        email,
        password,
      });

      if (response) {
        navigation.navigate("Login");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("An error occurred during login. Please try again.");
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111313" }}>
      <Container>
        <ContainerTop>
          <TitleContainer>
            <Title>
              Empower{"\n"}Minds{"\n"}Ignite Learning
            </Title>
          </TitleContainer>
          <InputContainer>
            <Input
              placeholder="First name"
              autoCapitalize="none"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholderTextColor="#808080"
            />
            <Input
              placeholder="Last name"
              autoCapitalize="none"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholderTextColor="#808080"
            />
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
          </InputContainer>
          <ButtonContainer>
            <SignUpButton onPress={handleSignUp}>
              <SignUpButtonText>Sign up</SignUpButtonText>
            </SignUpButton>

            <LoginButton onPress={navigateToLogin}>
              <LoginButtonText>Already a user? login</LoginButtonText>
            </LoginButton>
          </ButtonContainer>
        </ContainerTop>

        <ContainerBottom>
          {/* Add your TermsContainer, Terms, PrivacyLink here */}
        </ContainerBottom>
      </Container>
    </SafeAreaView>
  );
};

export default SignUpPage;
