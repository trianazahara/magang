// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Route untuk dashboard
router.get('/', authMiddleware.verifyToken, adminController.getDashboardStats);

module.exports = router;