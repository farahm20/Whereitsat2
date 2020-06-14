const buttonElem = document.querySelector('#loginButton');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');


async function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

function getToken() {
    return sessionStorage.getItem('auth');
}


async function login(username, password) {
    const url = 'http://localhost:8000/whereitsat/auth/login';
    const obj = {
        username: username,
        password: password
    }
    console.log("Staff.js, username and password recieved ")
    console.log(obj);

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log("Staff.js, data recieved ")
    console.log(data);
    return await data;
}


function getToken() {
    return sessionStorage.getItem('auth');
}

async function isLoggedIn() {
    const token = getToken();
    const url = 'http://localhost:8000/whereitsat/auth/isloggedin';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();

    if (data.isLoggedIn) {
        if (data.user.role === "staff") {
            location.href = 'http://localhost:8000/verify.html';
        } else {
            location.href = 'http://localhost:8000/admin.html'
        }
    }
}

buttonElem.addEventListener('click', async () => {
    const user = inputUser.value;
    const pass = inputPass.value;

    let loggedIn = await login(user, pass);
    console.log("LOGINPAGE...login function called")
    console.log(loggedIn.message);
    const token = loggedIn.token;
    console.log("LOGINPAGE - token recieved: token", token)

    if (loggedIn.success) {
        saveToken(loggedIn.token);
        //call function that sends user name and gets user role. 
        //if user role is staff then go to verify.html
        //if user role is admin go to admin.html
        setTimeout(() => {
            if (loggedIn.role === "admin") {
                location.href = 'http://localhost:8000/admin.html'
            } else if (loggedIn.role === "staff") {
                location.href = 'http://localhost:8000/verify.html'
            } else {
                location.href = 'http://localhost:8000/loginPage.html'
            }
        }, 100);
    } else {
        document.querySelector('#errorMessage').classList.toggle('hide');
    }
});

isLoggedIn();
