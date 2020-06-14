const {Router} = require('express');
const router = new Router();
const db = require('../models/database-operations');
const { initiateDatabase, createEvent, removeTicket } = require('../models/database-operations');


module.exports = (app) => {
    //'http://localhost:8000/whereitsat/getEvents'
    app.get('/whereitsat/', (request, response) => {
        response.send('<h1> Welcome to WHERE ITS AT </h1>');
    });

    //--------------------------------------------POST: add in Tickets ------------------------------------------- */
    //http://localhost:8000/whereitsat/addEvent/?id=1
    app.post('/whereitsat/addEvent', (req, res) => {
        const searchTerm = req.query;
    //    console.log('In endpoints for admin: ', searchTerm);

        res.send('in endpoints file..add event....');
        let obj = db.addItemInEvents(searchTerm);
        /*      let obj = {
                  message: 'Adding item in cart....'        
               }*/
        res.send(JSON.stringify(obj));
        return obj;
    })

    //--------------------------------------------POST: add in Tickets ------------------------------------------- */
    //http://localhost:8000/whereitsat/addticket/?id=1
    app.post('/whereitsat/addticket', (req, res) => {
        const searchTerm = req.query.id;

        //console.log(req.url);
        //console.log(searchTerm);
        //    res.send('In add item to cart endpoint....');
        let obj = db.addItemInTickets(searchTerm);
        /*      let obj = {
                  message: 'Adding item in cart....'        
               }*/
        res.send(JSON.stringify(obj));
        return obj;
    })

    //--------------------------------------------POST: add a specific product ------------------------------------------- */
    //http://localhost:8000/whereitsat/add/?id=1
    app.post('/whereitsat/add', (req, res) => {
        const searchTerm = req.query.id;
        //console.log(req.url);
        //console.log(searchTerm);
        //    res.send('In add item to cart endpoint....');
        let obj = db.addItemInOrders(searchTerm);
        /*      let obj = {
                  message: 'Adding item in cart....'        
               }*/
        res.send(JSON.stringify(obj));
        return obj;
    })

    //-------------------------------------------DELETE: remove a specific product ------------------------------------------- */
    // `http://localhost:8000/whereitsat/removeTicket/?ticketId=${ticketNum}`
       app.delete('/whereitsat/removeTicket', (req, res) => {
           const itemToDelete = req.query.ticketId;
           console.log("From req.query: ", req.query.ticketId);
       //    console.log(itemToDelete);
       //    res.send('At item to delete from cart endpoint....');
           db.removeTicket(itemToDelete);
           let obj = {
               message: 'Removing verified ticket....'
            }
            res.send(JSON.stringify(obj));
            console.log(obj);
       })
   

    //------------------------------------------- GET: get all of the events ------------------------------------------- */
    //http://localhost:8000/whereitsat/getEvents
    app.get('/whereitsat/getEvents', (req, res) => {

        let allEvents = db.getEvents();
        res.send(JSON.stringify(allEvents));

        console.log('At get Events endpoint....');
    });

    //-------------------------------------------GET: get all orders ------------------------------------------- */
    //http://localhost:8000/whereitsat/getOrders
    app.get('/whereitsat/getOrders', (req, res) => {
        let allOrders = db.getOrders();
        res.send(JSON.stringify(allOrders));

        console.log('At get Orders endpoint....');
    });

    //-------------------------------------------GET: get all Tickets ------------------------------------------- */
    //http://localhost:8000/whereitsat/getTickets
    app.get('/whereitsat/getTickets', (req, res) => {
        let allTickets = db.getTickets();
        res.send(JSON.stringify(allTickets));

        console.log('At get Tickets endpoint....');
    });


    //-------------------------------------------POST: creating a new event ------------------------------------------- */
    //http://localhost:8000/whereitsat/create/createEvent
    app.post('/whereitsat/create/createEvent', async (req, res) => {
    //    initiateDatabase();
    //    console.log("In the endpoints: ", req.body);
        const event = req.body;
    //    console.log("In the endpoints: ", req);
        const createdEvent = await createEvent(event);
    //    console.log("Created Event: ", createdEvent);

        let resObj = {
            id: createdEvent.id,
            name: createdEvent.name,
            place: createdEvent.place,
            timeFrom: createdEvent.timeFrom,
            timeTill: createdEvent.timeTill,
            price: createdEvent.price,
            tickets: createdEvent.tickets,
            totalTickets: createdEvent.totalTicket,
            date: createdEvent.date
        }

        console.log('In end points...resObj', resObj);
        res.send(JSON.stringify(resObj));
    });



    //all get or post functions will come here
}