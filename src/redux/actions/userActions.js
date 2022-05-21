import * as ActionsTypes from "../Constants/userActionTypes"

export function setActiveUser(user){
    return {
        type: ActionsTypes.SET_ACTIVE_USER,
        payload: user
    }
}

export function removeActiveUser(){
    return {
        type: ActionsTypes.REMOVE_ACTIVE_USER
    }
}

export function addPurchase(purchase){
    return {
        type: ActionsTypes.ADD_PURCHASE,
        payload: purchase
    }
}