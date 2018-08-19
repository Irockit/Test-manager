const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_CONTEXT':
            return [...state, action.context];
        default:
            return state;
    }
};
