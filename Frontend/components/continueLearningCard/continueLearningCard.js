import styled from "styled-components";

export const CardBackground = styled.TouchableOpacity`
  background-color: #1d1d1d;
  width: 180px;
  height: 210px;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
`;

export const Image = styled.Image`
  width: 100%;
  height: 110px;
  border-radius: 10px;
`;

export const TextContainer = styled.View`
  display: flex;
  gap: 10px;
  padding: 20px 0;
`;

export const Title = styled.Text`
  color: #ffeceb;
  font-weight: 600;
`;

export const Creator = styled.Text`
  color: #ffeceb;
  font-weight: 600;
`;
