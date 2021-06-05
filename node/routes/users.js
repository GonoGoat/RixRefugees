var express = require('express');
var router = express.Router();

var db = require('../queries/users');

router.get('/admin',db.getAllAdminUsers);
router.get('/admin/unavailable/:id',db.getUnavailableAdminUsersPerSessionsTasks)
router.get('/current', db.getCurrentUser);
router.get('/me',db.getUserInformation);
router.get('/edit',db.getUserInformationToChange);
router.post('/add',db.addUsers);
router.post('/login',db.login);
router.post('/logout',db.logout);
router.post('/password/reset',db.resetPassword);
router.post('/password/new',db.newPassword);
//router.delete('/delete',db.deleteUser);
router.put('/update',db.updateUser);


module.exports = router;