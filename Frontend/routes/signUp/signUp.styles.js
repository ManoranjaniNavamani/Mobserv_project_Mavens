// "signUp.styles.js"
import styled from "styled-components/native"; // Import the styled function

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
  top: 20px;
`;
export const ContainerBottom = styled.View`
  align-items: center;
  width: 100%;
`;

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

export const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

export const SignUpButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #e19c97;
  padding: 6px;
  width: 80%;
  border-radius: 5px;
`;

export const SignUpButtonText = styled.Text`
  color: #1d1d1d;
  font-size: 14px;
`;

export const LoginButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #1d1d1d;
  padding: 6px;
  width: 80%;
  border-radius: 5px;
`;

export const LoginButtonText = styled.Text`
  color: #fcf9ff;
  font-size: 14px;
`;

// Rest of your styled components can be defined here.
