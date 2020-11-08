import {SWITCH_USER} from "../Constants/action-types"

export function switchUser(payload) {
    return { type: SWITCH_USER, payload }
};