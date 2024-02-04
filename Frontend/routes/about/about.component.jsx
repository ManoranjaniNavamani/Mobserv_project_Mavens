import { StyleSheet, Text, View } from "react-native";

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Text>AboutPage</Text>
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
