const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('./Routes/login');
const createRouter = require('./Routes/create');
const accountRouter = require('./Routes/account');
//const adminRouter = require('./Routes/admin')


const app = express();

const database = require('./models/database-operations');
const endpoints = require('./Routes/endpoints');


const port = process.env.PORT || 8000;


app.use(express.static('view'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/whereitsat/accountType', accountRouter);
app.use('/whereitsat/create', createRouter);
app.use('/whereitsat/auth', loginRouter);
//app.use('/whereitsat', adminRouter);
endpoints(app);


app.listen(8000, () => {
    console.log('Server is running on port:', port);
    database.initiateDatabase();
});