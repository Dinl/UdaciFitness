import {
    RECEIVE_ENTRIES,
    ADD_ENTRY
} from '../actions'

function entries (state = {}, actionData){
    switch (actionData.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...actionData.entries
            }
        case ADD_ENTRY:
            return {
                ...state,
                ...actionData.entry
            }
        default:
            return state
    }
}

export default entries;