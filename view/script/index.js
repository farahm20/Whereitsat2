import { getOrder } from "./order.js";

/*
function getToken() {
    return sessionStorage.getItem('auth');
}

async function isloggedin() {
    const token = getToken();
    const url = 'http://localhost:8000/whereitsat/auth/isloggedin';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await response.json();
    console.log("isloggedin " , data);

    if (!data.isloggedin) {
        location.href = '/';
    }
}*/

/***************Getting the orders from database */
let orders;
async function getOrders() {
    orders = await getOrder();
    console.log("Here are the orders", orders);
    return await orders;
}

async function addEventToOrders(eventId) {
    console.log(eventId);
    let url = `http://localhost:8000/whereitsat/add/?id=${eventId}`;
    let response = await fetch(url, { method: 'POST' });
    let data = await response.json();
    return data;
}

/***************Getting the events from database */

async function getAllEvents() {
    const url = 'http://localhost:8000/whereitsat/getEvents';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

let events;

async function getEvents() {
    events = await getAllEvents();
    await getOrders();
    displayEvents(events);
}

getEvents();

/**Displaying events in html */
function displayEvents(events) {
 //   console.log(events);
    const containerElem = document.querySelector('.allEvents');

    for (let event of events) {
        //displaying event card
        let eventCard = document.createElement("div");
        eventCard.classList.add("eventCard");
        eventCard.setAttribute('id', event.id);


        //displaying Event place
        let eventPlace = document.createElement("h3");
        eventPlace.classList.add("eventPlace");
        eventPlace.innerText = event.place;

        //for time
        let articleTime = document.createElement('article');
        articleTime.classList.add("eventTime");
        //displaying Event from time
        let eventFromTime = document.createElement("h3");
        eventFromTime.classList.add("eventFromTime");
        eventFromTime.innerText = event.timeFrom + " - ";

        //displaying Event till time
        let eventTillTime = document.createElement("h3");
        eventTillTime.classList.add("eventTillTime");
        eventTillTime.innerText = " " + event.timeTill;

        //displaying Event price
        let eventPrice = document.createElement("p");
        eventPrice.classList.add("eventPrice");
        eventPrice.innerText = event.price + " SEK";

        //displaying Event date
        let eventDate = document.createElement("h3");
        eventDate.classList.add("eventDate");
        eventDate.innerText = event.date;

        //displying event name
        let article = document.createElement('article');
        article.classList.add("eventText");
        let eventName = document.createElement("button");
        eventName.classList.add("eventNameButton");
        eventName.innerHTML = event.name;



        article.appendChild(eventName);
        article.appendChild(eventPlace);
        articleTime.appendChild(eventFromTime);
        articleTime.appendChild(eventTillTime);
        article.appendChild(articleTime);


        eventCard.appendChild(eventDate);
        eventCard.appendChild(article);
        eventCard.appendChild(eventPrice);
        containerElem.appendChild(eventCard);

        eventName.addEventListener('click', async () => {
            /**create a click for event name
             * when its clicked go to event.html
             * take all the info for that clicked name and print on html */
            console.log("I have been clicked");
            addEventToOrders(event.id);
            window.location = "order.html";
        });
    }
}//end of display events

//isloggedin();