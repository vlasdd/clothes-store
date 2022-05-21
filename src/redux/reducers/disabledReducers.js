import * as ActionTypes from "../Constants/disabledActionTypes";

export function disabledReducer(state = false, { type, payload }){
    switch(type){
        case ActionTypes.SET_IS_PAGE_DISABLED: {
            return payload;
        }
        default: {
            return state;
        }
    }
}