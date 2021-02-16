import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Spinner } from "native-base";
import { black, pink, red } from "../themes/colors";
import { resetNavigationStack } from "../utils/common";

const Splash = (props) => {
  useEffect(() => {
    setTimeout(() => {
      resetNavigationStack(props.navigation, "Home");
    }, 5000);
  }, []);

  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.CircleStyle} />
      <Spinner color={red} />
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: black,
  },

  CircleStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: pink,
    alignItems: "center",
  },
});

export default Splash;
