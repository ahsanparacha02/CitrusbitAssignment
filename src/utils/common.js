import { Dimensions } from "react-native";
import { CommonActions } from "@react-navigation/native";

export const getWidth = Dimensions.get("window").width;
export const getHeight = Dimensions.get("window").height;

export const resetNavigationStack = (navigation, routeName) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    })
  );
};
