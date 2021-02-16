import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { pink } from "../themes/colors";
const TitleSection = (props) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.label}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: pink,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    width: "80%",
    marginBottom: 5,
  },
});

export { TitleSection };
