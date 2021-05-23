const router = require('express').Router();
const { request } = require("express");
const Order = require('../models/Order');
let User = require('../models/Order');

//inserting information to the database
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


//retrieve all the orders
router.route('/').get((req , res) => {
    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        console.log(err);
    })
})

//retrieve a specific order
router.route('/:id').get(async(req , res) => {
    let orderId = req.params.id;
    const order = await Order.findById(id).then(() => {
        res.status(200).send({status: 'Order is fetched' , order});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: 'Order is not found' , error: err.message})
    })
})

//update a specific order
router.route('/update/:id').put(async(req , res) => {
    let orderID = req.params.id;
    const {buyerId , items , totalPrice , date , cardNumber , cvc , cardHolderName , phone } = req.body;
    const updateOrder = {buyerId , items , totalPrice , date , cardNumber , cvc , cardHolderName , phone };

    const update = await Order.findByIdAndUpdate(orderID , updateOrder).then(() => {
        res.status(200).send({status: 'Order is updated' , order: update});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: 'Order is not updated'});
    })
})

//delete a specific order
router.route('/delete/:id').delete(async(req , res) => {
    let orderID = req.params.id;

    await Order.findByIdAndDelete( orderID ).then(() => {
        res.status(200).send({status: 'Order is deleted'});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: 'Error in Order deletion...' , error: err.message})
    })
})


module.exports = router;