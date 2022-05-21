import * as ActionTypes from "../Constants/itemsActionTypes";

export function setItems(items){
    return {
        type: ActionTypes.SET_ITEMS,
        payload: items
    }
}