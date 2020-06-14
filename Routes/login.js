const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();

const { getUserFromUsername } = require('../models/database-functions');
const { matchPassword } = require('../models/hashPassword');

router.post('/login', async (req, res) => {
    const body = req.body;
    console.log("router login - post login: ", body);

    let resObj = {
        success: false
    }

    const user = await getUserFromUsername(body);
    console.log("router login - getUserFromUserName:  ", user);

    if (user === undefined) {
        resObj.message = "Incorrect Username or Password!";
        return res.send(JSON.stringify(resObj));
    };

    const isAMatch = await matchPassword(body.password, user.password);
    console.log('is a Match: ', isAMatch);

    if (user && isAMatch) {
        const token = jwt.sign({
            uuid: user.uuid,
            username: user.username,
            role: user.role
        }, 'a1b1c1', {
            expiresIn: 600 //Expires in 10 min
        })
        resObj.success = true;
        resObj.role = user.role;
        resObj.token = token;
    }else{
        resObj.message = "Incorrect Username or Password!";
    }
    res.send(JSON.stringify(resObj));
});

router.get('/isloggedin', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log("router login - get isloggedin: ")
    console.log(token);
    console.log("*******");


    let resObj = {
        isLoggedIn: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'a1b1c1');

        if (user) {
            resObj.isLoggedIn = true;
            resObj.user = user;
        }
    }
    console.log("router login - get isloggedin: ")
    console.log(resObj);
    res.send(JSON.stringify(resObj));
});

module.exports = router;