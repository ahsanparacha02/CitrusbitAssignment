import { FORM_CHANGE } from "./Types/homeType";
const INITIAL_STATE = {
  selectedUser: {},
  selectedAlbum: {},
  imageUrl: "",
};

export default (state, action) => {
  if (!state) {
    state = INITIAL_STATE;
  }
  switch (action.type) {
    case FORM_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
