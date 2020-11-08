/*import React from "react"
import {connect} from "react-redux"
import {mapStateToProps} from "./redux-import"
import {mapDispatchToProps} from './redux-import'

function Header(props) {
    return <div>Hello user with id {props.user}
    <button onClick={() => props.switchUser({user : props.user+1})}>Modifier</button></div>
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
*/
import React from "react"
import {useSelector,useDispatch} from "react-redux"
import {switchUser} from "../redux/Actions/index"

function Header(props) {
    const userId = useSelector(state => state.user);
    const dispatch = useDispatch();
    return <div>Hello user with id {userId}
    <button onClick={() => dispatch(switchUser(userId+1))}>Modifier</button></div>
}
export default Header