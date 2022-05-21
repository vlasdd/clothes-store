import * as ActionsTypes from "../Constants/userActionTypes"

const initialState = {
    user: {
        userId: "",
        phoneNumber: "",
        gender: "",
        birthday: "",
        dateCreated: 0,
        purchasesList: [],
        emailAddress: "",
        username: "",
        fullName: "",
        profileImage: "",
    }
}

export function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ActionsTypes.SET_ACTIVE_USER: {
            return { user: payload };
        }
        case ActionsTypes.REMOVE_ACTIVE_USER: {
            return initialState
        }
        case ActionsTypes.ADD_PURCHASE: {
            return {
                user: {
                    ...state.user,
                    purchasesList: [...state.user.purchasesList, payload]
                }
            }
        }
        default: {
            return state
        }
    }
}