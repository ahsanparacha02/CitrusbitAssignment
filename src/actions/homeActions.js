import { apiUrls } from "../api/config";
import { FORM_CHANGE } from "../store/Types/homeType";

export const onFormChange = (value) => {
  return { type: FORM_CHANGE, payload: value };
};
export const onGetUsers = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(apiUrls.Users);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const onGetAlbums = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(apiUrls.Albums);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const onGetPhotos = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(apiUrls.Photos);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
