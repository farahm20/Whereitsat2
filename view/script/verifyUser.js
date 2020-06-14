export async function isLoggedin(token) {
    const url = 'http://localhost:8000/whereitsat/auth/isloggedin';
    console.log(token);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await response.json();
    console.log("In verify.js: data recieved: ");
    console.log(data.user);
    return data;
}