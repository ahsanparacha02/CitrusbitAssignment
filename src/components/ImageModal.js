import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { ScreenContainer } from "../commonComponents";
import { connect } from "react-redux";
import { red } from "../themes/colors";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { getHeight, getWidth } from "../utils/common";

const ImageModal = (props) => {
  const { navigation } = props;
  let scale = new Animated.Value(1);
  const handlePinch = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  });

  const onZoomStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <ScreenContainer>
      <Animated.View style={styles.container}>
        <MIcon
          name={"close"}
          size={30}
          color={red}
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.innerContainer}>
          <PinchGestureHandler
            onGestureEvent={handlePinch}
            onHandlerStateChange={onZoomStateChange}
          >
            <Animated.Image
              source={{
                uri: props.state.imageUrl,
              }}
              style={{
                width: getWidth,
                height: getHeight * 0.7,
                transform: [{ scale: scale }],
              }}
            />
          </PinchGestureHandler>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
});

export default connect(
  (state) => ({
    state: state.home,
  }),
  (dispatch) => ({})
)(ImageModal);
