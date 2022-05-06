import * as ActionTypes from "../contants/userActionTypes"

const initialState = {
    user: {
        userId: "",
        phoneNumber: "",
        gender: "",
        dateCreated: 0,
        purchasesList: [],
        emailAddress: "",
        username: "",
        fullName: "",
        profileImage: "",
    }
}

/*const initialState = {
    user: {
        emailAddress: 'vlad1234@gmail.com',
        fullName: 'Vlad vlad',
        phoneNumber: '',
        username: 'vlad1234',
        purchasesList: [],
        dateCreated: 1650975228787,
        gender: '',
        userId: 'L5hh4rNkkKXO5bBy5taBt6hP3qy2',
        profileImage: ""
    }
}*/

export function userReducer(state = initialState, {type, payload}){
    switch(type){
        case ActionTypes.SET_ACTIVE_USER: {
            return {user: payload};
        }
        case ActionTypes.REMOVE_ACTIVE_USER: {
            return initialState
        }
        default: {
            return state
        }
    }
}