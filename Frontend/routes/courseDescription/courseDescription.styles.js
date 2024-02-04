import styled from "styled-components/native";
import { Platform } from "react-native";

export const CoursePageContainer = styled.View`
  background-color: #040a10;
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
`;

export const CourseThumbnail = styled.Image`
  width: 100%;
  height: 280px;
  border-radius: 10px;
`;

export const CourseDescriptionContainer = styled.View`
  background-color: #040a10;
  width: 100%;
  flex: 1;
  border-radius: 20px 20px 0px 0px;
  padding: 30px;
`;

export const CourseDescriptionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  align-self: flex-end;
`;

export const CourseRating = styled.Text`
  font-size: 18px;
  color: #ffeceb;
  margin-left: 5px;
`;

export const CourseTitle = styled.Text`
  font-size: 24px;
  color: #ffeceb;
  margin-bottom: 20px;
`;

export const CourseInfoContainer = styled.View`
  flex: 1;
`;

export const CourseCreatorInfo = styled.View`
  /* Style for Creator Info */
`;

export const CourseBuyersInfo = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const CourseInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CourseInfoText = styled.Text`
  color: ${({ active }) => (active ? "#E19C97" : "#ffeceb")};
  font-size: 16px;
`;

export const RenderContent = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const CallToAction = styled.View`
  background-color: blue;
  width: 90%;
  height: 60px;
  z-index: 10;
  background-color: #040a10;
  border-radius: 50px;
  bottom: 30px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;

  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: { width: 0, height: -2 }; /* negative value for Y-axis to have shadow on the top */
      shadow-opacity: 0.1;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 4; /* This adds shadow to all sides on Android, there's no direct way to only have top shadow */
    `,
  })}
`;

export const PriceContainer = styled.View`
  display: flex;
  margin-left: 10px;
  gap: 3px;
`;

export const TotalPrice = styled.Text`
  font-size: 10px;
  color: #9e9e9e;
`;

export const Amount = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const EnrollButton = styled.TouchableOpacity`
  height: 80%;
  background-color: #e19c97;
  width: 60%;
  border-radius: 50px;
  color: #1d1d1d;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-weight: 500;
  font-size: 18px;
`;
