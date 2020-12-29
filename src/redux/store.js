import { createStore } from "redux";
import rootReducer from "./reducers/index";
import {INITIAL_STATE} from "./initialState";

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);