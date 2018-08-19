const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_STEP':
            return [...state, action.step];
        default:
            return state;
    }
};
