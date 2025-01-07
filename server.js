require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Routes
const authRoutes = require('./routes/auth');
// const internRoutes = require('./routes/intern');
const adminRoutes = require('./routes/admin');
// const profileRoutes = require('./routes/profile');
//const indexRouter = require('./routes/index');

app.use('/auth', authRoutes);
// app.use('/intern', internRoutes);
app.use('/', adminRoutes);
// app.use('/profile', profileRoutes);
// app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});