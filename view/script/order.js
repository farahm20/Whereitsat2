/**
 *  1: pick order from database and display on html
 *  2: after user buys, delete the order. 
 *  3: error msg should be displaed if no order is selected. 
 *  4: check orders. tickets number should be one less
 */

async function addOrderToTickets (orderId) {
    console.log(orderId);
    let url = `http://localhost:8000/whereitsat/addticket/?id=${orderId}`;
    let response = await fetch (url, { method: 'POST' });
    let data = await response.json();
    return data;
}


export async function getOrder() {

    const url = 'http://localhost:8000/whereitsat/getOrders';

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

let order;

async function getAllOrders () {
    order = await getOrder();
    console.log("In the order.js file: ", order);
    displayOrder(order);
}

getAllOrders();

function displayOrder(orders) {
    console.log(orders);
    const containerElem = document.querySelector('.theOrder');

    for (let order of orders) {
        containerElem.innerHTML = '';
        //displaying order card
        let orderCard = document.createElement("div");
        orderCard.classList.add("orderCard");
        orderCard.setAttribute('id', order.id);

        
        //displaying order place
        let orderPlace = document.createElement("h3");
        orderPlace.classList.add("orderPlace");
        orderPlace.innerText = order.place;
        
        //displaying order time
        //for time
        let articleTime = document.createElement('article');
        articleTime.classList.add("orderTime");
        //displaying Event from time
        let orderFromTime = document.createElement("h3");
        orderFromTime.classList.add("orderFromTime");
        orderFromTime.innerText = order.timeFrom + " - ";

        //displaying Event till time
        let orderTillTime = document.createElement("h3");
        orderTillTime.classList.add("orderTillTime");
        orderTillTime.innerText = " " + order.timeTill;
        
        //displaying order price
        let orderPrice = document.createElement("p");
        orderPrice.classList.add("orderPrice");
        orderPrice.innerText = order.price + " SEK";
        
        //displaying order date
        let orderDate = document.createElement("h3");
        orderDate.classList.add("orderDate");
        orderDate.innerText = order.date;
        
        //displying order name
        let article = document.createElement('article');
        article.classList.add("orderText");
        let orderName = document.createElement("h1");
        orderName.classList.add("orderName");
        orderName.innerHTML = order.name;   

        //displaying buy button
        let buyButton = document.createElement("button");
        buyButton.classList.add("buyButton");
        buyButton.innerHTML = "Purchase";
        buyButton.addEventListener('click', async() => {
            addOrderToTickets (order.id);
            window.location = "ticket.html";
        });        

        article.appendChild(orderName);
        orderCard.appendChild(article);

        orderCard.appendChild(orderDate);
        articleTime.appendChild(orderFromTime);
        articleTime.appendChild(orderTillTime);
        orderCard.appendChild(articleTime);
        
        orderCard.appendChild(orderPlace);
        orderCard.appendChild(orderPrice);
        orderCard.appendChild(buyButton);

        containerElem.appendChild(orderCard);
        
       
    }
}//end of display orders