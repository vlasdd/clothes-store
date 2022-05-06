import { userReducer } from "./userReducers";
import { combineReducers } from "redux";

const reducers = combineReducers({
    currentUser: userReducer
})

export default reducers;