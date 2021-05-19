
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    user: { type: String, required: true },
    cartItems: [
        {
            item: { type: String, required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true }
        }
    ]
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart ;