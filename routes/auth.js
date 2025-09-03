const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/user/register', authController.userRegister);
router.post('/user/login', authController.userLogin);
router.post('/admin/register', authController.adminRegister);
router.post('/admin/login', authController.adminLogin);

module.exports = router;