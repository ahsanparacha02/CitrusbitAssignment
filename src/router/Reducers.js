import { combineReducers } from "redux";
import homeReducer from "../store/homeReducer";

export default combineReducers({
  home: homeReducer,
});
