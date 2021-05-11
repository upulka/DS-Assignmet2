const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyer:{
        type: Object,
        require: true
    },
    items: {
        type: Array,
        require: true
    },
    totalPrice:{
        type: Number,
        require: true
    },
    date:{
        type: Date,
        require: true
    },
    cardNumber:{
        type: String
    },
    cvc:{
        type:Number
    },
    cardHolderName:{
        type: String
    },
    phone:{
        type: String
    }

})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
