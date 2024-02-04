import styled from 'styled-components/native';

export const CourseDescriptionLessonsContainer = styled.View`
	display: flex;
	height: 100%;
`;

export const CourseDescriptionLessonsTitle = styled.Text`
	color: #ffeceb;
`;

export const CourseSectionContainer = styled.View`
	padding: 15px 0;
	display: flex;
`;

export const CourseSectionTitles = styled.Text`
	color: #ffeceb;
	margin-bottom: 15px;
`;

export const CourseSection = styled.View`
	width: 100%;
	height: 50px;
	border: 0.5px solid #9e9e9e;
	border-radius: 50px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
`;

export const CourseSectionLeft = styled.View`
	display: flex;
	flex-direction: row;
	gap: 15px;
	align-items: center;
`;
export const CourseSectionRight = styled.View``;

export const CourseSectionLessonNumberCircle = styled.View`
	height: 40px;
	width: 40px;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 0.5px solid #e19c97;
`;
export const CourseSectionLessonNumber = styled.Text`
	color: #ffeceb;
	font-size: 20px;
`;

export const CourseSectionLessonTitleContainer = styled.View`
	display: flex;
`;

export const CourseSectionLessonTitle = styled.Text`
	color: #ffeceb;
	font-size: 14px;
`;

export const CourseSectionLessonDuration = styled.Text`
	color: #9e9e9e;
	font-size: 10px;
`;

export const CourseSectionPlayOption = styled.TouchableOpacity`
	height: 40px;
	width: 40px;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #e19c97;
`;
