require('colors');
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;

module.exports = async (client) => {
    console.log(`[READY] ${client.user.tag} is online.`.green);

    if (!mongoURL) return;
    mongoose.set("strictQuery", true);
    if (await mongoose.connect(mongoURL)) {
        console.log(`[DB] Connected to the database.`.green);
    }
};