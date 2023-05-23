import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { KeycloakProvider, useKeycloak } from "expo-keycloak-auth";
// import "./styles.css";

import { ActivityIndicator, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as auth from "expo-auth-session";
// import Header from "./components/Header";

WebBrowser.maybeCompleteAuthSession();

export const Auth = () => {
  const {
    ready, // If the discovery is already fetched
    login, // The login function - opens the browser
    isLoggedIn, // Helper boolean to use e.g. in your components down the tree
    token, // Access token, if available
    logout, // Logs the user out
  } = useKeycloak();
  if (!ready) return <ActivityIndicator />;

  function handlePress() {
    login();
  }

  if (!isLoggedIn) {
    return (
      <>
        <StatusBar animated={true} />
        <SafeAreaView className="flex items-center">
          <View className="h-[40%] bg-blue-600 w-screen p-10 px-6 text-white">
            {/* <StatusBar style="auto" /> */}
            <Text className="text-lg font-semibold uppercase text-white mb-7">PayStack</Text>
            <Text className="text-lg font-semibold  text-white text-center">
              Get Paid Faster and Easier Than Ever Before with Rewards
            </Text>
          </View>
          <View className="-mt-4 bg-white shadow-lg w-[90%] p-4 rounded-lg flex items-center  gap-y-4">
            <Text className="text-xl font-bold mb-4 text-center">Login to Paystack</Text>
            {/* <Button onPress={handlePress} title={"Sign In"} /> */}
            <TouchableOpacity className="bg-blue-600 w-28 p-2  rounded-md" onPress={handlePress}>
              <Text className="text-base text-white font-semibold uppercase text-center">Sign In</Text>
            </TouchableOpacity>
            <Text className="text-xl font-bold mt-4 text-center">New to Paystack!</Text>
            {/* <Button onPress={handlePress} title={"Sign Up"} className="bg-blue-600 w-28" /> */}
            <Text className="text-base text-gray-600 p-3 font-medium text-center w-[90vw]">
              For every payment you make using our website, you will earn a 2% reward. These rewards can be redeemed for
              cashback or used to make future payments. The more you use our website, the more rewards you can earn.
            </Text>
            <TouchableOpacity className="bg-blue-600 w-36 p-2  rounded-md" onPress={handlePress}>
              <Text className="text-base text-white font-semibold uppercase text-center">Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <SafeAreaView className="flex items-center gap-4 p-4 justify-center mx-auto">
        {/* <Header /> */}
        <Text className="text-xl font-semibold text-center">Welcome to Paystack!</Text>
        <Button onPress={logout} title={"Logout"} style={{ marginTop: 24 }} />
      </SafeAreaView>
    );
  }
};

export default function App() {
  const keycloakConfiguration = {
    url: "https://betasso.capitalguardians.com/auth", // This is usually an url ending with /auth
    realm: "ramesh",
    clientId: "social_login",
  };

  return (
    <KeycloakProvider {...keycloakConfiguration}>
      <Auth />
    </KeycloakProvider>
  );
}
