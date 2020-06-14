const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');
const router = new Router();

const { addUser } = require('../models/database-functions');
const { hashPassword } = require('../models/hashPassword');

/*
    1. Receive username and password in body
     2. Hasha password with bcrypt
     3. Generate uuid
     4. Add users to the database
     5. Sign the JWT token
     6. Send the token back to the client
*/

//Endpoint for creating account
router.post('/', async (req, res) => {
    let body = req.body;

    let resObj = {
        success: false
    }

    // hash password and save it in a variable
    const passwordHash = await hashPassword(body.password);
    console.log(passwordHash);
    // Add users to the database with usernames and the hash password
    const uuid = uuidv4();
    const userCreated = await addUser(uuid, body.username, passwordHash);

    if (userCreated) {
        const token = jwt.sign({ id: uuid }, 'a1b1c1', {
            expiresIn: 600 //Token expires in 10 min
        });
        resObj.success = true;
        resObj.token = token;
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;