const SIGN_IN = 'SIGN_IN';

export const signIn = (email) => {
    return {
        type: SIGN_IN,
        payload: email
    }
}
