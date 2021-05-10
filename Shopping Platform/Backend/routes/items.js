const router = require("express").Router();
const { request } = require("express");
let Item = require ('../models/Item');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, callback)=>{
//         callback(null, './frontend/public/uploads')
//     },
//     filename: (req, file, callback)=>{
//         callback(null, file.originalname)
//     }
// })

// const upload = multer({storage: storage});

router.route('/addItem').post((req, res)=> {
    const name = req.body.name;
    const price = Number(req.body.price);
    const description = req.body.description;

    const newItem = new Item({
        name,
        price,
        description, 
    })

    newItem.save().then(()=> {
        res.json("Item added")
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports = router;