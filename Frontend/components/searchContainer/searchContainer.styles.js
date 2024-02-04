import styled from "styled-components";

export const SearchArea = styled.View``;

export const SearchBoxContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 30px;
`;

export const SearchBox = styled.TextInput`
  width: 85%;
  height: 35px;
  background-color: #1d1d1d;
  border-radius: 8px;
  padding: 0 10px;
`;

export const BackgroundContainer = styled.View`
  background-color: #1d1d1d;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TopicContainer = styled.ScrollView`
  padding: 20px;
  display: flex;
`;

export const Topic = styled.Text`
  color: #ffeceb;
  font-size: 16px;
  margin-right: 30px;
`;
