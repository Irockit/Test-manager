const defaultState = [];

export default (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_TEMPLATE':
            return [...state, action.template];
        default:
            return state;
    }
};
