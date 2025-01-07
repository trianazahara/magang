const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/auth');

// Middleware untuk redirect ke dashboard jika sudah login
router.get('/login', redirectIfAuthenticated, authController.getLogin);
router.post('/login', redirectIfAuthenticated, authController.login);
router.get('/logout', authController.logout);

module.exports = router;