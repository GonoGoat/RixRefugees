const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    links : {
        display : 'inline-block',
        padding: '5px',
        marginRight : theme.spacing(1),
        backgroundColor : theme.palette.common.white,
        '&:hover': {
            backgroundColor : theme.palette.secondary.main,
        },
    },
    connection : {
        float : 'right',
        display : 'inline-block',
    },
    connectionButton : {
        color : theme.palette.common.white,
        marginRight : theme.spacing(1),
        '&:hover': {
            backgroundColor : theme.palette.secondary.main,
        },
    },
    admin : {
        float : 'left'
    },
    header : {
        padding : 0,
        margin : 0,
        maxWidth : '100%',
        paddingTop : theme.spacing(1),
        paddingBottom : theme.spacing(1),
        backgroundColor : theme.palette.primary.main
    },
    label : {
        '&:hover': {
            fontWeight: 'bold',
            textDecoration : 'underline',
            color : theme.palette.common.white
        },
    },
    divider : {
        borderWidth : '5px'
    }
}));

module.exports = classes