const db = require('../config/database');
const bcrypt = require('bcrypt');

async function createSuperAdmin() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        await db.execute(`
            INSERT INTO admin (
                nama_lengkap, 
                username, 
                email, 
                password, 
                role
            ) VALUES (?, ?, ?, ?, ?)
        `, [
            'Super Admin',
            'super_admin',
            'admin@example.com',
            hashedPassword,
            'super_admin'
        ]);

        console.log('Super Admin berhasil dibuat!');
        console.log('Username: super_admin');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error membuat super admin:', error);
    } finally {
        process.exit();
    }
}

createSuperAdmin();