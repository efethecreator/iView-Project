const express = require('express');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

// Admin Routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
