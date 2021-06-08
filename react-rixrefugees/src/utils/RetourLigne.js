function miseEnPage(part) {
    return (
        <span>
            {part}
            <br/>
        </span>
    )
}

function retourLigne(texte) {
    let str = texte.replace(/\n|\r\n|\r/g, "|");
    let parts = [];
    let index = 0;
    for (let i = 0;i<str.length;i++) {
        if (str[i] === '|') {
            if (index === i) {
                parts.push("");
            }
            else {
                parts.push(str.slice(index,i));
            }
            index = i+1;
        }
    }
    if (str[str.length - 1] !== "|") {
        parts.push(str.slice(index,str.length));
    }
    
    return (
        <span>
            {parts.map(miseEnPage)}
        </span>
    )
}