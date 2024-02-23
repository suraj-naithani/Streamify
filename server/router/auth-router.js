const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/test', auth.home);

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/google', auth.googleAuth);
router.get('/user', authMiddleware, auth.user);
router.get('/users/:id', auth.users);



module.exports = router;