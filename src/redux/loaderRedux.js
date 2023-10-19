// action types
const SET_LOADING = 'loading/setLoading';

// action creators
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

// reducer
const loaderReducer = (state = false, action) => {
    switch (action.type) {
        case SET_LOADING:
            return action.payload;
        default:
            return state;
    }
};

export default loaderReducer;