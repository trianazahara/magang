const db = require('../config/database');
const { createNotification } = require('../models/notification');

exports.getDashboard = async (req, res) => {
    try {
        const [aktif] = await db.execute('SELECT COUNT(*) as count FROM intern WHERE status = "aktif"');
        const [selesai] = await db.execute('SELECT COUNT(*) as count FROM intern WHERE status = "selesai"');
        const [total] = await db.execute('SELECT COUNT(*) as count FROM intern');
        
        res.render('dashboard/index', {
            aktif: aktif[0].count,
            selesai: selesai[0].count,
            total: total[0].count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createIntern = async (req, res) => {
    try {
        const {
            nama_lengkap, email, no_hp, perguruan_tinggi,
            fakultas, jurusan, nim, tanggal_pengajuan,
            tanggal_masuk, tanggal_keluar
        } = req.body;

        const [result] = await db.execute(
            `INSERT INTO intern (nama_lengkap, email, no_hp, perguruan_tinggi, 
            fakultas, jurusan, nim, tanggal_pengajuan, tanggal_masuk, tanggal_keluar) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nama_lengkap, email, no_hp, perguruan_tinggi, fakultas, jurusan, 
            nim, tanggal_pengajuan, tanggal_masuk, tanggal_keluar]
        );

        // Create notification
        await createNotification(req.user.id, `New intern ${nama_lengkap} has been added`);

        res.status(201).json({ message: 'Intern created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};