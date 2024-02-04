import Ionicons from '@expo/vector-icons/Ionicons';
import {
	CourseDescriptionLessonsContainer,
	CourseDescriptionLessonsTitle,
	CourseSectionContainer,
	CourseSectionTitles,
	CourseSection,
	CourseSectionLeft,
	CourseSectionRight,
	CourseSectionLessonNumberCircle,
	CourseSectionLessonNumber,
	CourseSectionLessonTitleContainer,
	CourseSectionLessonTitle,
	CourseSectionLessonDuration,
	CourseSectionPlayOption,
} from './courseDescriptionLessons.styles';

const CourseDescriptionLessons = ({lessons, navigation}) => {
	return (
		<CourseDescriptionLessonsContainer>
			<CourseDescriptionLessonsTitle>Lessons</CourseDescriptionLessonsTitle>
			<CourseSectionContainer>
				{lessons.map((item, index) => (
					<CourseSection key={index}>
						<CourseSectionLeft>
							<CourseSectionLessonNumberCircle>
								<CourseSectionLessonNumber>
									{index + 1}
								</CourseSectionLessonNumber>
							</CourseSectionLessonNumberCircle>
							<CourseSectionLessonTitleContainer>
								<CourseSectionLessonTitle>
									{item.title}
								</CourseSectionLessonTitle>
								<CourseSectionLessonDuration>
									{item.studyTime}
								</CourseSectionLessonDuration>
							</CourseSectionLessonTitleContainer>
						</CourseSectionLeft>
						<CourseSectionRight>
							<CourseSectionPlayOption
								onPress={() => {
									navigation.navigate('VideoPage');
								}}
							>
								<Ionicons
									name="play-circle-outline"
									size={30}
									color="#111313"
								/>
							</CourseSectionPlayOption>
						</CourseSectionRight>
					</CourseSection>
				))}
			</CourseSectionContainer>
		</CourseDescriptionLessonsContainer>
	);
};

export default CourseDescriptionLessons;
