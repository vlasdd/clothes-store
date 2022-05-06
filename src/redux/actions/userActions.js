import * as ActionsTypes from "../contants/userActionTypes"

export const setActiveUser = (user) => {
    return {
        type: ActionsTypes.SET_ACTIVE_USER,
        payload: user
    }
}

export const removeActiveUser = () => {
    return {
        type: ActionsTypes.REMOVE_ACTIVE_USER
    }
}