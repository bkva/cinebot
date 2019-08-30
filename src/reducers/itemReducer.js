import { GET_CINEBOT_STATUS, ITEM_LOADING, GET_LINKS } from "../actions/types";

const initialState = {
  cinebotStatus: null,
  links: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEM_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_CINEBOT_STATUS:
      return {
        ...state,
        cinebotStatus: action.payload,
        loading: false
      };

    case GET_LINKS:
      return {
        ...state,
        links: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
