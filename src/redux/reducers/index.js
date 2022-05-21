import { userReducer } from "./userReducers";
import { cartReducer } from "./cartReducers";
import { disabledReducer } from "./disabledReducers";
import { loadingReducer } from "./loadingReducers";
import { shouldUserLoginReducer } from "./shouldUserLoginReducers";
import { itemsReducer } from "./itemsReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    currentUser: userReducer,
    cart: cartReducer,
    isPageDisabled: disabledReducer,
    isBeingLoaded: loadingReducer,
    shouldUserLogin: shouldUserLoginReducer,
    allItems: itemsReducer
})

export default reducers;