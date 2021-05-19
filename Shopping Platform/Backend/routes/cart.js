const router = require("express").Router();
const { request } = require("express");
const Cart = require("../models/Cart");

// add items to a cart
router.route('/addToCart').post((req, res)=> {
    //get a specific user's cart
    Cart.findOne({user: req.body.user})
    .exec((err, cart)=>{
        if(err){
            return res.status(400).json({err});
        }
        if(cart)
        {   
            const item = req.body.cartItems.item;
            //if cart exist update the cart
            const i= cart.cartItems.find(cart=>cart.item== item);

            //if the added item exists in the cart
            if(i){
                //increase the quantity 
                Cart.findOneAndUpdate({user: req.body.user, "cartItems.item":item },
                    {
                        "$set":{
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: i.quantity+ req.body.cartItems.quantity
                            }
                        }
                    },
                    null, (err, cart)=>{
                        if(err){
                            return res.send({
                                success: false,
                                message: 'error',
                            });
                        }
                        
                        return res.send({
                            success: true,
                            message: 'added to cart',
                            cart: cart
                    });}
                    )
            }
            //if the item is not added to the cart previously
            else{
                //add the new item to the cart
                Cart.findOneAndUpdate({user: req.body.user},
                    {
                        $push:{
                            cartItems: req.body.cartItems
                        }
                    },
                    null, (err, _cart)=>{
                        if(err){
                            return res.send({
                                success: false,
                                message: 'error',
                            });
                        }
                        
                        return res.send({
                            success: true,
                            message: 'added to cart',
                            cart: _cart
                    });
                
                    })
                    
            }

        }else{

            //if cart doesnt exist create a new cart
            const cart = new Cart({
                user: req.body.user,
                cartItems: [req.body.cartItems]
            })
            
            cart.save((err, cart)=>{
                if(err){
                    return res.status(400).json({err});
                }
                if(cart)
                {
                    return res.status(201).json({cart});
                }
            });
        }

    });

    
});


router.route('/getCart/:userId').get((req, res)=> {
    Cart.findOne({user: req.params.userId}, function (err, cart) {
        if (err){
            console.log(err);
        }
        else{
            res.status(200).send(
                cart.cartItems
            )
        }
    })
    
});


module.exports = router;