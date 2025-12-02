const express = require('express'); // Restart trigger
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/subcategories', require('./routes/subcategoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const designRoutes = require('./routes/designRoutes');
app.use('/api/designs', designRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
