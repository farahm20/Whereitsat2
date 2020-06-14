const usernameElem = document.querySelector('#username');
const roleElem = document.querySelector('#role');

function getToken() {
    return sessionStorage.getItem('auth');
}

async function getAccount() {
    const url = 'http://localhost:8000/whereitsat/account/get';

    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();

    if (data.success) {
        usernameElem.innerHTML = data.user;
        roleElem.innerHTML = data.role;
    }
}


async function admin() {
    const url = 'http://localhost:8000/whereitsat/accountType/admin';

    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();

    if (data.success) {
        document.querySelector('#admin-area').classList.toggle('hide');
    }
}

async function clickButton() {
    const url = 'http://localhost:8000/whereitsat/accountType/test';

    const response = await fetch(url, { 
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
    const data = await response.json();
}

document.querySelector('#send').addEventListener('click', () => {
    clickButton();
});

getAccount();
admin();