const reducers = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'SET_TYPE_USER':
            return {
                ...state,
                typeOfUser: action.payload
            }
        default:
            return state;
    }
}

export default reducers;