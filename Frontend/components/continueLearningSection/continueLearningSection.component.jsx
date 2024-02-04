import ContinueLearningnCard from "../continueLearningCard/continueLearningCard.component";
import {
  ContinueLearningSectionContainer,
  Header,
  Title,
  SeeAll,
  ContinueLearningCardContainer,
  ButtonContainer,
} from "./continueLearningSection.styles";

const ContinueLearningSection = ({ cardsData, navigation }) => {
  return (
    <ContinueLearningSectionContainer>
      <Header>
        <Title>Continue Learning</Title>
        <SeeAll>See All</SeeAll>
      </Header>

      <ContinueLearningCardContainer>
        {cardsData.map((item) => (
          <ContinueLearningnCard
            navigation={navigation}
            key={item._id}
            id={item._id}
            image={item.imageUrl}
            course={item.title}
            creator={`${item.createdBy.firstName} ${item.createdBy.lastName}`}
          />
        ))}
      </ContinueLearningCardContainer>
    </ContinueLearningSectionContainer>
  );
};

export default ContinueLearningSection;
