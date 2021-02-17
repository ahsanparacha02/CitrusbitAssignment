import { Spinner, Toast } from "native-base";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScreenContainer, TitleSection } from "../commonComponents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homeAction from "../actions/homeActions";
import { lightBlack, red, white } from "../themes/colors";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { getWidth } from "../utils/common";

const Home = (props) => {
  const { navigation } = props;
  const [albums, setAlbums] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    onGetAllAlbums();
  }, []);

  const onGetAllAlbums = () => {
    const {
      actions: { onGetAlbums },
      state: { selectedUser },
    } = props;
    setLoading(true);
    onGetAlbums()
      .then((res) => {
        debugger;
        const albums = res.filter((item) => {
          return item.userId === selectedUser.id;
        });
        setAlbums(albums);
      })
      .catch((error) => {
        Toast.show({
          text: error.message,
          position: "bottom",
          duration: 2500,
          type: "danger",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onSelectAlbum = (album) => {
    const { onFormChange } = props.actions;
    onFormChange({ prop: "selectedAlbum", value: album });
    navigation.navigate("Photos");
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() => onSelectAlbum(item)}
      >
        <View style={styles.infoContianer}>
          <View style={styles.circle}>
            <Text style={styles.label}>
              {item.title.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{ marginLeft: 10, width: getWidth * 0.65 }}>
            <Text style={styles.label}>{item.title}</Text>
          </View>
        </View>
        <MIcon name="keyboard-arrow-right" size={20} color={white} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer
      wantHeader
      wantBackPress
      headerLabel={"Albums"}
      navigation={navigation}
    >
      <TitleSection label={props.state.selectedUser.name} />
      {!isLoading ? (
        <FlatList
          data={albums}
          renderItem={renderList}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Spinner color={red} />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    backgroundColor: lightBlack,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  infoContianer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: red,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: white,
    fontSize: 17,
  },
});

export default connect(
  (state) => ({
    state: state.home,
  }),
  (dispatch) => ({
    actions: bindActionCreators(homeAction, dispatch),
  })
)(Home);
