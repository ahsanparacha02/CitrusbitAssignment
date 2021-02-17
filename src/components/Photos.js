import {
  Spinner,
  Toast,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
} from "native-base";
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScreenContainer, TitleSection } from "../commonComponents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homeAction from "../actions/homeActions";
import { lightBlack, red, white } from "../themes/colors";

const Home = (props) => {
  const { navigation } = props;
  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    onGetAllPhotos();
  }, []);

  const onGetAllPhotos = () => {
    const {
      actions: { onGetPhotos },
      state: { selectedAlbum },
    } = props;
    setLoading(true);
    onGetPhotos()
      .then((res) => {
        debugger;
        const photoList = res.filter((item) => {
          return item.albumId === selectedAlbum.id;
        });
        setPhotos(photoList);
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

  const renderList = ({ item }) => {
    return (
      <Card>
        <CardItem style={{ backgroundColor: lightBlack }}>
          <Left>
            <Thumbnail source={{ uri: item.thumbnailUrl }} />
            <Body>
              <Text style={styles.headerLable}>{item.title}</Text>
            </Body>
          </Left>
        </CardItem>
        <TouchableOpacity
          onPress={() => {
            props.actions.onFormChange({ prop: "imageUrl", value: item.url });
            navigation.navigate("ImageModal");
          }}
        >
          <CardItem cardBody>
            <Image source={{ uri: item.url }} style={styles.image} />
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <ScreenContainer
      wantHeader
      wantBackPress
      headerLabel={"Photos"}
      navigation={navigation}
    >
      <TitleSection label={props.state.selectedAlbum.title} />
      {!isLoading ? (
        <FlatList
          data={photos}
          renderItem={renderList}
          keyExtractor={(item) => item.id.toString()}
          style={{ paddingHorizontal: 10 }}
        />
      ) : (
        <Spinner color={red} />
      )}
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  label: {
    color: white,
    fontSize: 18,
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  headerLable: {
    fontWeight: "bold",
    color: white,
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
