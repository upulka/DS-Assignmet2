const router = require("express").Router();
const { request } = require("express");
let User = require('../models/User');

//http://localhost:8070/user/register
router.route('/register').post((req, res)=> {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const userType = req.body.userType;
    const email = req.body.email;
    const phone = req.body.phone;

    const newUser = new User({
        name,
        username,
        password,
        userType,
        email,
        phone
    })

    newUser.save().then(()=> {
        res.json("User Registered")
    }).catch((err)=>{
        console.log(err)
    })

})
//http://localhost:8070/user/
router.route('/').get((req, res)=>{
    User.find().then((users)=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route('/:id').get(async(req, res)=>{
    let id = req.params.id;
    const user = await User.findById(id).then(()=>{
        res.status(200).send({user: user})
    }).catch((err)=>{
        res.status(500).send({status: "Error with get user", error:err.message});
    })
})
module.exports = router;