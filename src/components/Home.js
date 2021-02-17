import { Spinner, Toast } from "native-base";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScreenContainer } from "../commonComponents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homeAction from "../actions/homeActions";
import { lightBlack, red, white } from "../themes/colors";
import MIcon from "react-native-vector-icons/MaterialIcons";

const Home = (props) => {
  const { navigation } = props;
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    onGetAllUsers();
  }, []);

  const onGetAllUsers = () => {
    const { onGetUsers } = props.actions;
    setLoading(true);
    onGetUsers()
      .then((res) => {
        setUsers(res);
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
  const onSelectUser = (user) => {
    const { onFormChange } = props.actions;
    onFormChange({ prop: "selectedUser", value: user });
    navigation.navigate("Albums");
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() => onSelectUser(item)}
      >
        <View style={styles.infoContianer}>
          <View style={styles.circle}>
            <Text style={styles.label}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={{ ...styles.label, fontSize: 14 }}>{item.email}</Text>
            <Text style={{ ...styles.label, fontSize: 14 }}>{item.phone}</Text>
            <Text style={{ ...styles.label, fontSize: 14 }}>
              {item.website}
            </Text>
          </View>
        </View>
        <MIcon name="keyboard-arrow-right" size={20} color={white} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer wantHeader headerLabel={"Users"} navigation={navigation}>
      {!isLoading ? (
        <FlatList
          data={users}
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
    fontSize: 18,
  },
});

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: bindActionCreators(homeAction, dispatch),
  })
)(Home);
