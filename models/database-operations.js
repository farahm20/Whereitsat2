const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = lowdb(adapter);

exports.initiateDatabase = () => {
    const hasDatabase = database.has('Events').value();

    if (!hasDatabase) {
        database.defaults({ Events: [] }).write();
    }
};
exports.getEvents = () => {
    return database.get('Events').value();
}

exports.getOrders = () => {
    return database.get('Orders').value();
}

exports.getTickets = () => {
    return database.get('Tickets').value();
}
//-------------------------------------------CREATING A NEW EVENT IN DATABASE------------------------------------------- */
exports.createEvent = (event) => {
    //  console.log("in database operations, event recieved from admin.js: " + event);
    let dbEvents = database.get('Events').value();
    let eventsLength = dbEvents.length;
    //    console.log("in database operations, event length " + eventsLength);
    eventsLength = eventsLength + 1; //assigning index to new event entry

    database.get('Events').push({
        id: eventsLength,
        name: event.name,
        place: event.place,
        timeFrom: event.timeFrom,
        timeTill: event.timeTill,
        price: event.price,
        tickets: 0,
        totalTicket: parseInt(event.totalTicket),
        date: event.date
    }).write();

    const eventCreated = database.get('Events').find({ id: event.id }).value();
    //        console.log(" In database operations: ", eventCreated);
    return eventCreated;
}

//-------------------------------------------FIND ITEM IN ORDERS------------------------------------------- */
//An event once selected in pushed in Orders
function findItemInOrders(itemToFind) {
    const findInOrders = database.get('Orders').find({ id: itemToFind }).value();
    //    console.log(findInOrders);
    return findInOrders;
}

//-------------------------------------------FIND ITEM IN TICKETS------------------------------------------- */
function findItemInTickets(itemToFind) {
    const findInTickets = database.get('Tickets').find({ ticketId: itemToFind }).value();
    //    console.log(findInTickets);
    return findInTickets;
}

//-------------------------------------------GENERATE TICKET NUMBER------------------------------------------- */
//to assign with every event order
function generateTicketNumber() {
    let alphaNumeric = "";
    var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 3; i++) {
        alphaNumeric += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    let randomNumber = Math.floor(Math.random() * (1000));
    let finalTicketNumber = alphaNumeric + randomNumber;
    console.log(alphaNumeric);
    return finalTicketNumber;
}

//-------------------------------------------ADD ITEM TO Orders------------------------------------------- */
exports.addItemInTickets = (index) => {
    let itemtoAdd = parseInt(index);
    //    console.log('add Item In Tickets: ', itemtoAdd);

    let ticketNum = generateTicketNumber();

    /* NOT ADD THE SAME PRODUCT TO CART CHECK */
    const checkInOrders = findItemInOrders(itemtoAdd);//find item in orders
    //    console.log('addItemInTickets getting from order: ', checkInOrders);

    const matchProduct = database.get('Tickets').push(checkInOrders).write();
    //    console.log(matchProduct);

    //change the ticket number when adding a ticket in orders
    database.get('Tickets').find({ id: itemtoAdd }).assign({ ticketId: ticketNum }).write();

    alertMessage = {
        status: 'SUCCESS', message: "Item added in Tickets"
    };
    //    console.log(alertMessage);

    return alertMessage;
}

//-------------------------------------------ADD ITEM TO Orders------------------------------------------- */
exports.addItemInOrders = (searchTerm) => {
    let count = 0;
    let itemtoAdd = parseInt(searchTerm);
    //    console.log(itemtoAdd);

    const matchProduct = database.get('Events').find({ id: itemtoAdd }).value();
    //subtracting 1 from total number of tickets with every purchase
    let ticketIndexToChange = database.get('Events').filter({ id: itemtoAdd }).map('totalTicket').value();
    ticketIndexToChange = parseInt(ticketIndexToChange);
    ticketIndexToChange = ticketIndexToChange - 1;

    //    console.log("ticket Index To Change: ", ticketIndexToChange);
    //console.log(matchProduct);

    if (matchProduct === undefined) {
        alertMessage = {
            status: 'ERROR', message: "EVENT NOT FOUND "
        };
        //    console.log(alertMessage);
    } else {
        alertMessage = {
            status: 'SUCCESS', message: "Valid ID. Item found in Events. "
        }
        console.log(alertMessage);
        count += 1;

        const checkInOrders = findItemInOrders(itemtoAdd);//find item in orders


        database.get('Events').find({ id: itemtoAdd }).assign({ tickets: ticketIndexToChange }).write(); //change the ticket number when adding a ticket in orders
     //   console.log("The ticket number now: ", matchProduct.tickets);
        database.get('Orders').push(matchProduct).write();

        alertMessage = {
            status: 'SUCCESS', message: "Item added in the Orders"
        };
        console.log(alertMessage);
    }


    return alertMessage;
}
//-------------------------------------------DELETE ITEM FROM Tickets------------------------------------------- */

exports.removeTicket = (itemToDelete) => {
    let removeItem = itemToDelete;
    //console.log(removeItem);

    const checkInTickets = findItemInTickets(removeItem);//find item in Tickets
    //console.log(checkInTickets);

    if (checkInTickets !== undefined) {
        database.get('Tickets').remove(checkInTickets).write();
        alertMessage = {
            status: 'SUCCESS', message: "Item removed from Tickets"
        };
        console.log(alertMessage);
    } else {
        alertMessage = {
            status: 'ERROR', message: "Invalid request- Item not found in Tickets" };
        console.log(alertMessage);
    }
}
/*
exports.deleteCart = (allCartItems) => {
    database.get('Cart').remove(allCartItems).write();
    console.log('Cart deleted succesfully');
}
*/