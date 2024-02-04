import styled from "styled-components/native";
import { SvgUri } from "react-native-svg";

export const Container = {
  padding: 30,
  paddingTop: 140,
  alignItems: "center",
  justifyContent: "space-between",
};

export const TitleContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 60%;
  margin-bottom: 30px;
`;

export const MLogo = styled(SvgUri)`
  width: 100px;
  height: 80px;
  z-index: 100;
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

export const CustomButton = styled.TouchableOpacity`
  background-color: #808080;
  padding: 5px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 80%;
  flex-direction: row;
  align-items: center;
`;

export const CreateChapter = styled.TouchableOpacity`
  align-items: center;
  padding: 6px;
  width: 80%;
  border-radius: 5px;
`;

export const CreateChapterText = styled.Text`
  color: #6b6b6b;
`;
