import React from "react";
import { Container, Left, Right } from "native-base";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { black, white } from "../themes/colors";
import MIcon from "react-native-vector-icons/MaterialIcons";

const renderHeader = (wantBackPress, navigation, label) => {
  return (
    <View style={styles.headerContainer}>
      <Left style={{ flex: 1 }}>
        {wantBackPress && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          >
            <MIcon name={"arrow-back-ios"} color={white} size={30} />
          </TouchableOpacity>
        )}
      </Left>
      <Text style={styles.label}>{label}</Text>
      <Right style={{ flex: 1 }}></Right>
    </View>
  );
};
const ScreenContainer = (props) => {
  const { wantHeader, navigation, wantBackPress, headerLabel } = props;

  return (
    <Container style={styles.containerStyle}>
      {wantHeader && renderHeader(wantBackPress, navigation, headerLabel)}
      <StatusBar barStyle="light-content" backgroundColor={black} />
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
    </Container>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: black,
  },
  headerContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: white,
    fontSize: 20,
    fontWeight: "bold",
  },
};
export { ScreenContainer };
