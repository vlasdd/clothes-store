import * as ActionsTypes from "../Constants/cartActionTypes";

export function setCart(cart){
    return {
        type: ActionsTypes.SET_CART,
        payload: cart
    }
}

export function addToCart(item){
    return {
        type: ActionsTypes.ADD_TO_CART,
        payload: item
    }
}

export function removeItemsType(item){
    return {
        type: ActionsTypes.REMOVE_ITEMS_TYPE,
        payload: item
    }
}

export function removeSingleItem(item){
    return {
        type: ActionsTypes.REMOVE_SINGLE_ITEM,
        payload: item
    }
}

export function clearCart(){
    return {
        type: ActionsTypes.CLEAR_CART
    }
}