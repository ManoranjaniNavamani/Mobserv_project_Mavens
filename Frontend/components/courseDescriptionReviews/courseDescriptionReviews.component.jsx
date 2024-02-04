// CourseDescriptionReviews.js
import React from "react";
import { ScrollView } from "react-native"; // Import ScrollView
import * as CourseDescriptionReviewsStyles from "./courseDescriptionReviews.styles";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <CourseDescriptionReviewsStyles.StarIcon
        key={i}
        name={i <= rating ? "star" : "star-outline"}
        size={15}
      />
    );
  }
  return stars;
};

const CourseDescriptionReviews = ({ ratings }) => {
  return (
    <ScrollView>
      <CourseDescriptionReviewsStyles.Container>
        {ratings.map((review, index) => (
          <CourseDescriptionReviewsStyles.ReviewContainer key={index}>
            <CourseDescriptionReviewsStyles.UserContainer>
              <CourseDescriptionReviewsStyles.ProfileImage
                source={{ uri: review.createdBy.profileImage }}
              />
              <CourseDescriptionReviewsStyles.UserInfo>
                <CourseDescriptionReviewsStyles.UserName>
                  {review.createdBy.firstName}
                </CourseDescriptionReviewsStyles.UserName>
                <CourseDescriptionReviewsStyles.RatingContainer>
                  {renderStars(review.rating)}
                </CourseDescriptionReviewsStyles.RatingContainer>
              </CourseDescriptionReviewsStyles.UserInfo>
            </CourseDescriptionReviewsStyles.UserContainer>
            <CourseDescriptionReviewsStyles.ReviewContent>
              <CourseDescriptionReviewsStyles.ReviewText>
                {review.text}
              </CourseDescriptionReviewsStyles.ReviewText>
            </CourseDescriptionReviewsStyles.ReviewContent>
          </CourseDescriptionReviewsStyles.ReviewContainer>
        ))}
      </CourseDescriptionReviewsStyles.Container>
    </ScrollView>
  );
};

export default CourseDescriptionReviews;
