import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        We are a company dedicated to providing high-quality services to our
        customers.
      </Text>
      <Text style={styles.text}>
        Our mission is to deliver the best experience with innovation and
        integrity.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
    elevation: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default AboutUs;
