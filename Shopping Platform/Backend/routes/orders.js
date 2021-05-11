const router = require('express').Router();
const { request } = require("express");
const Order = require('../models/Order');
let User = require('../models/Order');

router.route('/newOrder').post((req, res)=> {
    const buyerId = req.body.buyerId;
    const items = req.body.items;
    const totalPrice = req.body.totalPrice;
    const date = req.body.date;
    const cardNumber = req.body.cardNumber;
    const cvc = req.body.cvc;
    const cardHolderName = req.body.cardHolderName;
    const phone = req.body.phone;

    const newOrder = new Order({
        buyerId,
        items,
        totalPrice,
        date,
        cardNumber,
        cvc,
        cardHolderName,
        phone
    })

    newOrder.save().then(()=> {
        res.json("order placed")
    }).catch((err)=>{
        console.log(err)
    })

})
module.exports = router;