import Header from "@/components/Header";
import GlobalStyles from "@/constant/GlobalStyles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

export default function About() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container} edges={["top"]}>
        <Header />
        <ScrollView>
          <Text style={GlobalStyles.title}>About</Text>

          <View>
            <Text>
              We are a company dedicated to providing high-quality services to
              our customers.
            </Text>
            <Text>
              Our mission is to deliver the best experience with innovation and
              integrity.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
