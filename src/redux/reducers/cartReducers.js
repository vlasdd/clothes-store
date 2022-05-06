import * as ActionTypes from "../contants/cartActionTypes"

/*function amountOfAppears(obj){
    return cartItems.reduce((value, elem) => {
        if(elem.id == obj.id){
            value++;
        }
        return value;
    }, 0)
}*/

export function cartReducer(state = [], {type, payload}){
    switch(type){
        case ActionTypes.ADD_TO_CART: {
            return [...state, payload];
        }
        case ActionTypes.REMOVE_ITEMS_TYPE: {
            return state.filter(elem => elem.id != payload.id);
        }
        case ActionTypes.REMOVE_SINGLE_ITEM: {
            let countOfAppears = state.reduce((value, elem) => {
                if (elem.id == payload.id) {
                    value++;
                }
                return value;
            }, 0);

            return state.reduce((arr, elem) => {
                if (elem.id != payload.id) {
                    arr.push(elem);
                }
                else if (elem.id == payload.id && countOfAppears > 1) {
                    arr.push(elem);
                    countOfAppears--;
                }
                return arr;
            }, []);
        }
        default: {
            return state;
        }
    }
}