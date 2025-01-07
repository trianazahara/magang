const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    if (!req.session.token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.redirect('/auth/login');
    }
};

exports.redirectIfAuthenticated = (req, res, next) => {
    if (req.session.token) {
        return res.redirect('/dashboard');
    }
    next();
};

exports.isSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({ 
            message: 'Anda tidak memiliki akses ke halaman ini' 
        });
    }
    next();
};