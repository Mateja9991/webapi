const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//
//              Schema
//
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        min: 0,
        max: 150,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not an email.');
            }
        },
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [7, 'Sifra mora da ima minimum 7 karaktera.'],
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    lastActiveAt: Date,
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Team'
    }],

});
//
//              Virtuals
//
//  Taskovi clana
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'editors'
});
//  Poruke
userSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'sentTo',
});
//  Neprocitane poruke
userSchema.virtual('newMessages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'sentTo',
    match: { seen: false }
});
//  Procitane poruke
userSchema.virtual('seenMessages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'sentTo',
    match: { seen: true }
});
//  Poslate poruke
userSchema.virtual('sentMessages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'from'
});
//
//              Middleware
//
//  Hash plaintext password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
//
//              Model methods
// 
//  Provera email + pass (LOGOVANJE)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login.');
    }
    if (!await bcrypt.compare(password, user.password)) {
        throw new Error('Unable to login.');
    }
    return user;
};
//
//              Document methods
//
//
// ... 
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};
//  Generisanje Tokena prilikom logovanja / kreiranja naloga
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN_KEY, { expiresIn: '7 days' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
//
//
//
const User = mongoose.model('User', userSchema);

module.exports = User;