import OffersForYouCardSectionCardData from "./OffersForYouCardData";
import OffersForYouCard from "../OffersForYouCard/OffersForYouCard.component";
import { OffersContainer, Title, OffersCardContainer } from "./offersForYouSection.styles";

const OffersForYou = () => {
  return (
    <OffersContainer>
      <Title>Offers for you</Title>
      <OffersCardContainer horizontal={true} showsHorizontalScrollIndicator={false}>
        {OffersForYouCardSectionCardData.map((item) => (
          <OffersForYouCard key={item.id} image={item.image} />
        ))}
      </OffersCardContainer>
    </OffersContainer>
  );
};

export default OffersForYou;
