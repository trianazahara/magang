module.exports = {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: 86400, // 24 hours
    uploadPath: './public/uploads',
    maxFileSize: 2 * 1024 * 1024, // 2MB
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']
};