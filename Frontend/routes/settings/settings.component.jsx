import { StyleSheet, Text, View } from "react-native";
import "./settings.styles";

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <Text>SettingsPage</Text>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
