const buttonElem = document.querySelector('#submit');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#pass');


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

    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
   
    console.log("script client - recieved from login: ", data);

    return await data;
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
    console.log("script client - recieved from isloggedIn: ", data);

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

    if (loggedIn.success) {
        saveToken(loggedIn.token);
        setTimeout(() => {
            location.href = 'http://localhost:8000/verify.html'
        }, 100);
    } else {
        document.querySelector('#errorMessage').classList.toggle('hide');
    }
});

isLoggedIn();