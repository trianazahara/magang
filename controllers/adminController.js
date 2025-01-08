// controllers/adminController.js
const db = require('../config/database');

const adminController = {
    // Method untuk dashboard stats
    getDashboardStats: async (req, res) => {
        try {
            const [activeInterns] = await db.execute(
                'SELECT COUNT(*) as count FROM intern WHERE status = "aktif"'
            );
            const [completedInterns] = await db.execute(
                'SELECT COUNT(*) as count FROM intern WHERE status = "selesai"'
            );
            const [upcomingCompletions] = await db.execute(`
                SELECT * FROM intern 
                WHERE status = 'aktif' 
                AND tanggal_keluar BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 5 DAY)
            `);
            
            // Render view daripada mengirim JSON
            res.render('dashboard', {
                activeInterns: activeInterns[0].count,
                completedInterns: completedInterns[0].count,
                totalInterns: activeInterns[0].count + completedInterns[0].count,
                upcomingCompletions: upcomingCompletions
            });
        } catch (error) {
            console.error('Error mengambil data dashboard:', error);
            res.status(500).render('error', { message: 'Terjadi kesalahan server' });
        }
    }

    // Tambahkan method admin lainnya di sini jika diperlukan
};

module.exports = adminController;