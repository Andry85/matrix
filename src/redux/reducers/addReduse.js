import {ADD} from "../actionTypes";

const initialState = {
    value: 0,
    rows: [1,2,3,4,5,6,7,8,9,10],
    cols: [1,2,3,4,5,6,7,8,9,10]
};

export default function(state = initialState, action) {
    switch (action.type) {
      case ADD: {
        return {
          ...state,
          value: action.payload,
        };
      }
      default:
        return state;
    }
  }
  