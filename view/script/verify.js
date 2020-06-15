//import { isLoggedin } from "../script/verifyUser.js";

const verifyButton = document.querySelector('#verifyButton');
const getFromTicketForm = document.querySelector('#ticketNumber');
const logoutButton = document.querySelector('#logoutButton');

isLoggedin();
function getToken() {
    return sessionStorage.getItem('auth');
}

//checkUserType();
async function checkUserType() {
    console.log("Check user function");
    const token = getToken();
    let checkUser = await isLoggedin(token);
    console.log(checkUser.user.role);
//    if (checkUser.user.role === "staff") {
    if(checkUser.user.role !== "staff"){
        location.href = 'http://localhost:8000/loginPage.html';
    } 
  /*  else {
        location.href = 'http://localhost:8000/admin.html'
    };*/
}

async function isLoggedin() {

    const token = getToken();
    const url = 'http://localhost:8000/whereitsat/auth/isloggedin';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await response.json();
    console.log("In verify.js: data recieved: ");
    console.log(data);

    if (token) {
        console.log("its not null");
        console.log(data.user.role);

        if (data.user.role === "admin") {
            location.href = 'http://localhost:8000/loginPage.html';
        }
    }else {
        console.log("LOGIN FIRST");
        location.href = 'http://localhost:8000/loginPage.html';

    }
}

verifyButton.addEventListener('click', () => {
    ticketNumber = getFromTicketForm.value;
    console.log("Verify.js : After button is clicked ", ticketNumber);
    deleteVerifyTicket(ticketNumber);
    verifyButton.innerHTML = "TICKET VERIFIED";

})

async function deleteVerifyTicket(ticketNum) {
    console.log("Inside delete ticket function: ", ticketNum);
    try {
        let url = `http://localhost:8000/whereitsat/removeTicket/?ticketId=${ticketNum}`;
        let response = await fetch(url, { method: 'DELETE' });
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("Error");
    }
};

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('auth');
    location.href = '/';
});
//getAccountType();
