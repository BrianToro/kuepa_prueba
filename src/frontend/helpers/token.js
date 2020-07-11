export const setTokenToLocalStorage = (token) => {
    localStorage.setItem('api_key', token);
}

export const deleteToketFromLocalStorage = () => {
    localStorage.removeItem('api_key');
}

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('api_key');
}