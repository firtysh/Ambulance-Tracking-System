const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
    },
    phone : {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});
userSchema.methods.isCorrectPassword = async function (providedPassword, userPassword) {
    return await bcrypt.compare(providedPassword, userPassword);
};

    

const User = mongoose.model('User', userSchema);

module.exports = User;