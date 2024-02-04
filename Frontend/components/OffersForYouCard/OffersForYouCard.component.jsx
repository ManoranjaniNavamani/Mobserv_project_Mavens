import { OffersCardContainer, Image } from "./OffersForYouCard.styles";

const OffersForYouCard = ({ image }) => {
  return (
    <OffersCardContainer>
      <Image source={image} />
    </OffersCardContainer>
  );
};

export default OffersForYouCard;
