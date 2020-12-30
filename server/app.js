const express = require('express');
const app = express();
const cors = require('cors');
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Importing routes
const crmRoutes= require("./Routes/crmRoute");
const userRoutes= require("./Routes/userRoute");
// Routes
app.use('/api/crm', crmRoutes);
app.use('/api/user', userRoutes);
// throw error when page is not found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;