export const signIn = (email) => {
    return {
        type: 'SIGN_IN',
        payload: email
    }
}

export const setImage = (link) => {
    return {
        type: 'SET_IMG',
        payload: link
    }
}