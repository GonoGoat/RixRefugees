const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    root : {
        backgroundColor : theme.palette.primary.main,
        margin : 0,
        padding : 0,
        maxWidth : '100%'
    },
    links : {
        display : 'inline-block',
        padding: '5px',
        marginRight : theme.spacing(1),
        color : theme.palette.common.white,
        textDecoration : 'underline',
        cursor : 'pointer',
        '&:hover': {
            fontWeight : 'bold',
        },
    },
}));

module.exports = classes