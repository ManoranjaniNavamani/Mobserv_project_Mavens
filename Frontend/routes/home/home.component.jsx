import Header from "../../components/header/header.component";
import CurrentLearningCard from "../../components/continueLearningSection/continueLearningSection.component";
import SearchContainer from "../../components/searchContainer/searchContainer.component";
import OffersForYouSection from "../../components/offersForYouSection/offersForYouSection.component";
import { ScrollView } from "react-native-gesture-handler";
import { Container } from "../../app.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetCategories } from "../../requests/categories";
import { useAuth } from "../../context/authContext";
import { GetCourses } from "../../requests/courses";
import React, { useEffect, useState } from "react";
import { statusUpdater } from "../../requests/user";
import { useFocusEffect } from "@react-navigation/native";

const HomePage = ({ navigation }) => {
  const [courseData, setCourseData] = useState([]);
  const [categoriesData, setCategories] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        if (token) {
          const catres = await GetCategories(token, {});
          catres ? setCategories(catres) : setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error.message);
        alert("An error occurred while fetching data. Please try again.");
      }
    };
    const startOnlineStatusUpdater = (token) => {
      const intervalId = setInterval(() => {
        statusUpdater(token);
      }, 5000);
      return () => clearInterval(intervalId);
    };

    if (token) {
      startOnlineStatusUpdater(token);
      fetchData(token);
    }
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          if (token) {
            const res = await GetCourses(token, {});
            res ? setCourseData(res) : setCourseData([]);
          }
        } catch (error) {
          alert("An error occurred while fetching data. Please try again.");
        }
      };

      fetchData();
    }, [token])
  );
  return (
    <Container>
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <Header
            navigation={navigation}
            firstName={user ? user.firstName : ""}
            lastName={user ? user.lastName : ""}
          />
          <SearchContainer categories={categoriesData} />
          <CurrentLearningCard cardsData={courseData} navigation={navigation} />
          <OffersForYouSection />
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default HomePage;
