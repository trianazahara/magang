// controllers/adminController.js
const db = require('../config/database');

const adminController = {
    // Method untuk dashboard stats
    getDashboardStats: async (req, res) => {
        try {
            // Hitung anak magang aktif
            const [activeInterns] = await db.execute(
                'SELECT COUNT(*) as count FROM intern WHERE status = "aktif"'
            );

            // Hitung anak magang selesai
            const [completedInterns] = await db.execute(
                'SELECT COUNT(*) as count FROM intern WHERE status = "selesai"'
            );

            // Hitung anak magang yang akan selesai dalam 5 hari
            const [upcomingCompletions] = await db.execute(`
                SELECT * FROM intern 
                WHERE status = 'aktif' 
                AND tanggal_keluar BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY)
            `);

            res.json({
                activeCount: activeInterns[0].count,
                completedCount: completedInterns[0].count,
                totalCount: activeInterns[0].count + completedInterns[0].count,
                upcomingCompletions: upcomingCompletions
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            res.status(500).json({ message: 'Terjadi kesalahan server' });
        }
    },

    // Tambahkan method admin lainnya di sini jika diperlukan
};

module.exports = adminController;