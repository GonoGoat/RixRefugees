/**
 * @author https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
 */

import React from "react";

function NewlineText(props) {
    const text = props.text.toString()
    const newText = text.split('\n').map(str => <React.Fragment>{str}</React.Fragment>);
    
    return newText;
}

export default NewlineText;