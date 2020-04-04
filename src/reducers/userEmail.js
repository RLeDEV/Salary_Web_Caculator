const initialState = {
    user: {
        email: "",
        imageUrl: "",
        name: "",
        isLoading: true
    }
}

const SIGN_IN = 'SIGN_IN';

const userEmailReducer = (state = initialState, action) => {
    const { payload } = action
    switch(action.type) {
        case SIGN_IN:
            localStorage.setItem('user', payload.email);
            return {
                ...state,
                user: {
                    email: payload.email,
                    imageUrl: payload.imageUrl,
                    name: payload.name,
                    isLoading: payload.isLoading
                }
            }
        default:
            return state;
    }
};

export default userEmailReducer;