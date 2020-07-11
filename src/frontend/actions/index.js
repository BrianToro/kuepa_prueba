import axios from 'axios';

export const setUserToState = payload => ({
    type: "SET_USER",
    payload,    
})

export const setTypeOfUserToState = payload => ({
    type: "SET_TYPE_USER",
    payload,
})