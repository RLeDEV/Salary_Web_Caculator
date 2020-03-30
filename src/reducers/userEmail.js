const initialState = {
    user: {
        email: "",
        imageUrl: "",
        name: ""
    }
}

const userEmailReducer = (state = initialState, action) => {
    const { payload } = action
    switch(action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                user: {
                    email: payload.email,
                    imageUrl: payload.imageUrl,
                    name: payload.name
                }
            }
        default:
            return state;
    }
};

export default userEmailReducer;