const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek apakah input menggunakan email atau username
        const [users] = await db.execute(
            'SELECT * FROM admin WHERE username = ? OR email = ?',
            [username, username]
        );

        if (users.length === 0) {
            return res.render('auth/login', {
                error: 'Username atau password salah'
            });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.render('auth/login', {
                error: 'Username atau password salah'
            });
        }

        // Update last login
        await db.execute(
            'UPDATE admin SET last_login = NOW() WHERE id = ?',
            [user.id]
        );

        // Buat token JWT
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                role: user.role 
            },
            process.env.JWT_SECRET || 'kunci_rahasia_default', 
            { expiresIn: '24h' }
        );

        // Simpan token di session
        req.session.token = token;
        req.session.user = {
            id: user.id,
            username: user.username,
            nama_lengkap: user.nama_lengkap,
            role: user.role
        };

        // Redirect ke dashboard
        res.redirect('/dashboard');

    } catch (error) {
        console.error('Login error:', error);
        res.render('auth/login', {
            error: 'Terjadi kesalahan saat login'
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/auth/login');
    });
};