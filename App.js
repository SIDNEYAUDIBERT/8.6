import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Map from "./src/components/Map";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  console.log(loaded);
  if (loaded === false) {
    return (
      <View style={styles.splash}>
        <LottieView
          autoPlay
          loop={false}
          style={{
            width: 600,
            height: 600,
          }}
          source={require("./assets/lottiehuitsix.json")}
          onAnimationFinish={() => {
            console.log("animation finished");
            setLoaded(true);
          }}
        />
      </View>
    );
  } else {
    return <Map />;
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
