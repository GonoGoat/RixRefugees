import {switchUser} from "../redux/Actions/index"

export const mapStateToProps = (state) => {
    return { user : state.user }
}

export const mapDispatchToProps = (disptach) => {
    return {
        switchUser : user => disptach(switchUser(user))
    };
}