// CourseCreationPage.jsx
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  Container,
  TitleContainer,
  MLogo,
  Title,
  InputContainer,
  Input,
  ButtonContainer,
  CreateButton,
  CustomButton,
  CreateButtonText,
  CreateChapter,
  CreateChapterText,
} from "./courseCreation.styles";
import { useAuth } from "../../context/authContext";
import { createCourse } from "../../requests/courses";
import ImagePicker from "react-native-image-picker";

import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const CourseCreationPage = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useAuth();

  const [selected, setSelected] = useState([]);

  const handleCreateCourse = async () => {
    try {
      if (!title || !description || !image || !price || !image) {
        alert("Please fill all fields");
        return;
      }
      const formData = new FormData();
      formData.append("file", {
        uri:
          Platform.OS === "android"
            ? image.uri
            : image.uri.replace("file://", ""),
        type: "image/jpeg",
        name: image.name,
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      const response = await createCourse(token, formData);
      if (response) {
        setTitle("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImage(null);
        alert("Course created successfully!");
      } else {
        alert("Failed to create course. Please try again.");
      }
    } catch (error) {
      console.error("Course creation error:", error.message);
      alert("An error occurred during course creation. Please try again.");
    }
  };

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.canceled == false) {
        console.log(result.assets[0]);
        setImage(result.assets[0]);
      } else {
        console.log("Document picking cancelled.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111313" }}>
      <ScrollView contentContainerStyle={Container}>
        <TitleContainer>
          <Title>Create Your Course</Title>
        </TitleContainer>
        <InputContainer>
          <Input
            placeholder="Course Title"
            autoCapitalize="none"
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholderTextColor="#808080"
          />
          <Input
            placeholder="Course Description"
            autoCapitalize="none"
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholderTextColor="#808080"
            multiline
            numberOfLines={4}
          />
          <Input
            placeholder="Category"
            value={category}
            onChangeText={(text) => setCategory(text)}
            placeholderTextColor="#808080"
          />
          <Input
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => setPrice(text)}
            placeholderTextColor="#808080"
          />
          <CustomButton onPress={pickImage}>
            <Ionicons
              name="image"
              size={24}
              color="#ffffff"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: "#ffffff" }}>Pick an Image</Text>
          </CustomButton>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
          )}
        </InputContainer>
        <ButtonContainer>
          <CreateChapter
            onPress={() => {
              navigation.navigate("CreateChapter");
            }}
          >
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select a category"
              searchPlaceholder="Search..."
              value={selected}
              onChange={(item) => {
                setSelected(item);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
              selectedStyle={styles.selectedStyle}
            />
          </CreateChapter>
          <CreateButton onPress={handleCreateCourse}>
            <CreateButtonText>Create Course</CreateButtonText>
          </CreateButton>
        </ButtonContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseCreationPage;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 30,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
