// CourseDescriptionReviewsStyles.js
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReviewContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #1d1d1d;
  background-color: #111313;
  border-radius: 10px;
  gap: 20px;
  width: 100%;
  padding: 10px;
`;

export const UserContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const ProfileImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 25px;
`;

export const UserInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 85%;
`;

export const UserName = styled.Text`
  color: #808080; /* Grey color */
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: auto; /* Move stars to the right */
`;

export const StarIcon = styled(Ionicons)`
  color: #e19c97;
  margin-right: 2px;
`;

export const ReviewContent = styled.View``;

export const ReviewText = styled.Text`
  color: #808080;
`;
