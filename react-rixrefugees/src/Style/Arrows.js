const { makeStyles } = require("@material-ui/core")

const classes = makeStyles((theme) => ({
    next : {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        right : 15
    },
    prev : {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        left : 15
    }
}));

module.exports = classes