import { Colors } from "@/constant/Colors";
import { Tabs } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "lightgray",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          paddingTop: 12,
          elevation: 0.5,
          shadowOpacity: 0.5,
          shadowRadius: 5,
          position: "absolute",
          margin: 16,
          borderRadius: 100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto size={size} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="penjahit"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people-alt" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="jahitan"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="briefcase" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="building" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
