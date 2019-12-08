const express = require('express');

const users = require('../../controllers/users');
const { checkRole } = require('../../utils/checkRole');

const router = express.Router();

router.get('/:id', users.getUserById);
router.get('/', checkRole(1), users.getListOfUsers);
router.put('/changeRole', checkRole(1), users.changeRole);
router.put('/:id', users.editUser);
router.delete('/:id', checkRole(1), users.removeUser);

module.exports = router;
