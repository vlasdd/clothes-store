import * as ActionsTypes from "../Constants/shouldUserLoginActionTypes";

export function setShouldUserLogin(value){
    return {
        type: ActionsTypes.SET_SHOULD_USER_LOGIN,
        payload: value
    }
}