const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userType: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
});

//method to generate encrypted password
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
//validate the encrypted password
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
const User = mongoose.model('User',userSchema);

module.exports = User;