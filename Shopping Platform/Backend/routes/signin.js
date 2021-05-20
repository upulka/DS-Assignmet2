const router = require("express").Router();
const { request } = require("express");
let User = require('../models/User');
let UserSession = require('../models/UserSession');


//create a new usersession when a user logs into the system
router.route('/signin').post((req, res)=> {
    //get the username and the password
    const {body} = req;
    const {
        password,
        username
    } = body;
    //if username not available
    if(!username){
        return res.send({
            success: false,
            message: 'Error: username cannot be blank'
        });
    }
    //if password is not available
    if(!password){
        return res.send({
            success: false,
            message: 'Error: password cannot be blank'
        });
    }
    //find the user by username
    User.find({
        username: username
    }, (err, users)=>{
        if(err){
            return res.send({
                success: false,
                message: 'Error'
            });
        }
        if(users.length !=1){
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        const user = users[0];
        if(!user.validPassword(password)){
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        
        //create a new session
        const userSession = new UserSession;
        userSession.userId = user._id;
        userSession.userType=user.userType;
        userSession.save((err, userSession)=>{
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }

            return res.send({
                success: true,
                message: 'Valid',
                token: userSession._id,
                userType: userSession.userType
                
            });
        });
    });

})
//verify if a user is logged in or not with a token
router.route('/verify').get((req, res)=>{
    const {query} = req;
    const{token} = query;
    UserSession.findOne({
        _id: token,
        isDeleted: false,
    },(err, session)=>{
        if(err){
            return res.send({
                success: false,
                message: 'error'
            });
        }
        if(session){
            return res.send({
                success: true,
                message: 'valid',
                userId: session.userId,
        });
}
    })
    .catch((err)=>{
        console.error(err)
    });
});

//logout a user
router.route('/logout').put((req, res)=>{
    const {query} = req;
    const{token} = query;
    // let token = req.params.token;
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false,
    },{
        //set isDeleted for the token as false
        $set:{
            isDeleted: true
        }
    },null, (err, sessions)=>{
        if(err){
            return res.send({
                success: false,
                message: 'error'
            });
        }
        
        return res.send({
            success: true,
            message: 'logged out'
    });

    });
});

module.exports = router;



     
        
        