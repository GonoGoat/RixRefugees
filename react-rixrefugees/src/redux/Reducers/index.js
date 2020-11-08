import {SWITCH_USER} from "../Constants/action-types"
const initialState = { user : 0}

function userReducer(state = initialState, action) {
    switch(action.type) {
        case SWITCH_USER :
            let nextState;
            nextState = {
                ...state,
                user : action.payload.user
            }
            return nextState;
        default :
            return state;
    }
}

export default userReducer;