const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_TEST':
            return [...state, action.test];
        default:
            return state;
    }
};
