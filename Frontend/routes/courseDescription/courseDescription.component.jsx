// CourseDescriptionPage.js
import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  CoursePageContainer,
  CourseThumbnail,
  CourseDescriptionContainer,
  CourseDescriptionHeader,
  CourseRating,
  CourseTitle,
  CourseInfoContainer,
  CourseCreatorInfo,
  CourseBuyersInfo,
  RenderContent,
  CourseInfoText,
  CourseInfo,
  CallToAction,
  PriceContainer,
  EnrollButton,
  ButtonText,
  TotalPrice,
  Amount,
} from "./courseDescription.styles";

import CourseDescriptionAbout from "../../components/courseDescriptionAbout/courseDescriptionAbout.component";
import CourseDescriptionLessons from "../../components/courseDescriptionLessons/courseDescriptionLessons.component";
import CourseDescriptionReviews from "../../components/courseDescriptionReviews/courseDescriptionReviews.component";
import { useAuth } from "../../context/authContext";
import { EnrollCourse, GetCourseById } from "../../requests/courses";
import { useFocusEffect, useRoute } from "@react-navigation/native";

const CourseDescriptionPage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [courseData, setCourseData] = useState("about");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { token } = useAuth();
  const route = useRoute();
  const { id } = route.params;

  // courseData?.chapters[0].videoUrl
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          if (token) {
            const result = await GetCourseById(id, token);
            setCourseData(result);
            console.log(result.course.isSubscribed);
            setIsSubscribed(result?.course?.isSubscribed);
          }
        } catch (error) {
          console.error("Error fetching users:", error.message);
        }
      };

      fetchData();
    }, [token, id])
  );

  const handleEnrollment = async () => {
    let response = await EnrollCourse(token, id);
    if (response) {
      setIsSubscribed(true);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <CourseDescriptionAbout text={courseData?.course?.description} />
        );
      case "lessons":
        return (
          <CourseDescriptionLessons
            lessons={courseData?.chapters ? courseData?.chapters : []}
            navigation={navigation}
          />
        );
      case "reviews":
        return (
          <View>
            <CourseDescriptionReviews
              ratings={courseData?.ratings ? courseData?.ratings : []}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <CoursePageContainer>
      <CourseThumbnail
        source={{
          uri: `http://10.188.243.19:8000/uploads/${courseData?.course?.imageUrl}`,
        }}
      />
      <CourseDescriptionContainer>
        <CourseDescriptionHeader>
          <Ionicons name="star-outline" size={20} color="#E19C97" />
          <CourseRating>{courseData?.course?.averageRating}</CourseRating>
        </CourseDescriptionHeader>
        <CourseTitle>{courseData?.course?.title}</CourseTitle>
        <CourseInfoContainer>
          <CourseCreatorInfo>{/* Creator Info Here */}</CourseCreatorInfo>
          <CourseBuyersInfo>
            <TouchableOpacity onPress={() => setActiveTab("about")}>
              <CourseInfo>
                <CourseInfoText active={activeTab === "about"}>
                  About
                </CourseInfoText>
              </CourseInfo>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("lessons")}>
              <CourseInfo>
                <CourseInfoText active={activeTab === "lessons"}>
                  Lessons
                </CourseInfoText>
              </CourseInfo>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("reviews")}>
              <CourseInfo>
                <CourseInfoText active={activeTab === "reviews"}>
                  Reviews
                </CourseInfoText>
              </CourseInfo>
            </TouchableOpacity>
          </CourseBuyersInfo>
          <RenderContent>{renderContent()}</RenderContent>
        </CourseInfoContainer>
      </CourseDescriptionContainer>
      <CallToAction>
        <PriceContainer>
          <TotalPrice>Total Price</TotalPrice>
          <Amount>
            {isSubscribed ? "Owned" : "$" + courseData?.course?.price}
          </Amount>
        </PriceContainer>
        {isSubscribed ? (
          <EnrollButton
            onPress={() =>
              navigation.navigate("CreateReviewPage", { courseId: id })
            }
          >
            <ButtonText>Review</ButtonText>
          </EnrollButton>
        ) : (
          <EnrollButton onPress={handleEnrollment}>
            <ButtonText>Enroll Now</ButtonText>
          </EnrollButton>
        )}
      </CallToAction>
    </CoursePageContainer>
  );
};

export default CourseDescriptionPage;
