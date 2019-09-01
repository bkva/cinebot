import {
  GET_CINEBOT_STATUS,
  ITEM_LOADING,
  GET_ERRORS,
  GET_LINKS
} from "./types";
import axios from "axios";

// Get Status
export const getStatus = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`https://cb.niweera.gq`)
    .then(res => {
      const status = {
        lastRan: res.data.cinebot_last_ran_at,
        nextRun: res.data.cinebot_next_run_at
      };
      dispatch({
        type: GET_CINEBOT_STATUS,
        payload: status
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// // Get Links
// export const getLinks = (pageno, size) => dispatch => {
//   dispatch(setItemLoading());
//   axios
//     .get(`https://cb.niweera.gq/links?pageno=${pageno}&size=${size}`)
//     .then(res => {
//       dispatch({
//         type: GET_LINKS,
//         payload: res.data
//       });
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

//Get paginated data
export const getData = pageno => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`https://cb.niweera.gq/links?pageno=${pageno}&size=20`)
    .then(res => {
      dispatch({
        type: GET_LINKS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Item loading
export const setItemLoading = () => {
  return {
    type: ITEM_LOADING
  };
};
