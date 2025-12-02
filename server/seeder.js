const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Item = require('./models/Item');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Item.deleteMany();
        await User.deleteMany();

        const user = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: '123456',
        });

        const items = [
            {
                name: 'Dataset A',
                description: 'Financial records for Q1',
                category: 'Finance',
                status: 'Active',
                user: user._id,
            },
            {
                name: 'Dataset B',
                description: 'User engagement metrics',
                category: 'Marketing',
                status: 'Pending',
                user: user._id,
            },
            {
                name: 'Dataset C',
                description: 'Server logs',
                category: 'IT',
                status: 'Inactive',
                user: user._id,
            },
            {
                name: 'Dataset D',
                description: 'Customer feedback',
                category: 'Support',
                status: 'Active',
                user: user._id,
            },
        ];

        await Item.insertMany(items);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Item.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
