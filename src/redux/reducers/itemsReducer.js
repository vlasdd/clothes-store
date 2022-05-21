import * as ActionTypes from "../Constants/itemsActionTypes";

export function itemsReducer(state = [], { type, payload }){
    switch(type){
        case ActionTypes.SET_ITEMS: {
            return payload;
        }
        default: {
            return state;
        }
    }
}