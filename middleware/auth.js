const jwt = require('jsonwebtoken');
const { getUser } = require('../models/database-functions');

module.exports = {
    async user(req, res, next) {
       // Verify if token is valid and if so, retrieve user and return
       // Otherwise, deny access and return request failure
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            console.log('TOKEN: ', token);
            const data = jwt.verify(token, 'a1b1c1');
            console.log('----------------------');
            console.log('Data from jwt.verify ', data);
            const user = await getUser(data);
            console.log('----------------------');
            console.log('User from database: ', user);
            
            req.user = user;
            console.log('----------------------');
            console.log('Before next function');
            next(); //express can go ahead to the next endpoint
        } catch (error) {
            // Catch errors and return a response
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid' }));
        }
    },

    async admin(req, res, next) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'a1b1c1');
            console.log('Data from jwt.verify ', data);
            const user = await getUser(data);
            console.log('User from database: ', user);
            if(user.role !== 'admin') {
                throw new Error();
            }
            
            req.user = user;

            next(); 
        } catch (error) {
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid' }));
        }
    }
}