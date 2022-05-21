import * as ActionTypes from "../Constants/cartActionTypes"

export function cartReducer(state = [], {type, payload}){
    switch(type){
        case ActionTypes.SET_CART: {
            return payload;
        }
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
        case ActionTypes.CLEAR_CART: {
            return [];
        }
        default: {
            return state;
        }
    }
}