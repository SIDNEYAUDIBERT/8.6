import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Map from "./src/components/Map";
import * as Location from "expo-location";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

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
  } else if (currentLocation && initialRegion) {
    return (
      <Map
        currentLocation={currentLocation}
        initialRegion={initialRegion}
      ></Map>
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
