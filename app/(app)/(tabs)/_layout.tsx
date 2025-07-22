import { colors } from "@/constant/theme";
import { Tabs, useRouter } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";

const TabLayout = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "lightgray",
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 12,
          borderTopStartRadius: 24,
          borderTopEndRadius: 24,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Fontisto size={size} name="home" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(app)/(tabs)");
          },
        }}
      />

      <Tabs.Screen
        name="jahitan"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="briefcase" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(app)/(tabs)/jahitan");
          },
        }}
      />

      <Tabs.Screen
        name="penjahit"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people-alt" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(app)/(tabs)/penjahit");
          },
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="building" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(app)/(tabs)/dashboard");
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
