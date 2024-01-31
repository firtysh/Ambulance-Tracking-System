const mongoose = require('mongoose');


const uri = process.env.MONGO_URI;

const connectToMongoDB = async () => {

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = connectToMongoDB;
