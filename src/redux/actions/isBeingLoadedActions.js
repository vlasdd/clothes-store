import * as ActionsTypes from "../Constants/isBeingLoadedActionTypes";

export function setIsBeingLoaded(value){
    return {
        type: ActionsTypes.SET_IS_BEING_LOADED,
        payload: value
    }
}