import axios from 'axios';

export const setUserToState = payload => ({
    type: "SET_USER",
    payload,    
})