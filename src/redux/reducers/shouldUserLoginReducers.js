import * as ActionTypes from "../Constants/shouldUserLoginActionTypes";

export function shouldUserLoginReducer(state = false, { type, payload }){
    switch(type){
        case ActionTypes.SET_SHOULD_USER_LOGIN: {
            return payload;
        }
        default: {
            return state;
        }
    }
}