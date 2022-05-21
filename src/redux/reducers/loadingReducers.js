import * as ActionTypes from "../Constants/isBeingLoadedActionTypes";

export function loadingReducer(state = false, { type, payload }){
    switch(type){
        case ActionTypes.SET_IS_BEING_LOADED: {
            return payload;
        }
        default: {
            return state;
        }
    }
}