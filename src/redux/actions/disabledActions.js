import * as ActionsTypes from "../Constants/disabledActionTypes";

export function setIsPageDisabled(value){
    return {
        type: ActionsTypes.SET_IS_PAGE_DISABLED,
        payload: value
    }
}