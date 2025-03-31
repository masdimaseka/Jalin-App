import { Colors } from "@/constant/Colors";
import { Tabs } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GlobalStyles from "@/constant/GlobalStyles";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "lightgray",
        headerShown: false,
        tabBarStyle: GlobalStyles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="penjahit"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people-alt" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="building" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
