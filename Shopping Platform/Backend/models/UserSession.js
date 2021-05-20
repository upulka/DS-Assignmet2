const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSessionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId, ref: 'User' ,
    },
    timeStanp:{
        type:Date,
        default: Date.now()
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    userType:{
        type:String
    }

})

const UserSession = mongoose.model('UserSession',userSessionSchema);

module.exports = UserSession;