/**
 * @author https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
 */

import React from "react";

function NewlineText(props) {
    if (!props.text) return ''
    const text = props.text.toString()
    const newText = text.split('\n').map(str => <React.Fragment>{str}<br/></React.Fragment>);
    
    return newText;
}

export default NewlineText;