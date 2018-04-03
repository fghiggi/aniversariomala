let images = request()
    .then(imgs => images = imgs)
    .catch(error => console.log(error));

document.querySelector('h1').innerHTML = getMessage();

setInterval(function () {
    Array.from(document.getElementsByClassName('grid-item')).forEach(element => {
        element.style.backgroundImage = `url(${images[Math.floor(Math.random() * images.length)]})`;
    });
}, 2500);

function getMessage() {
    const currentDate = getCurrentDate();
    const bday = new Date('2018-04-13');

    let message = '🎁';

    if (currentDate.getTime() > bday.getTime()) {
        message = Math.floor((new Date('2019-04-13') - currentDate) / (1000 * 60 * 60 * 24));
    }

    if (currentDate.getTime() < bday.getTime()) {
        message = Math.floor((bday - currentDate) / (1000 * 60 * 60 * 24));
    }

    return message;
}

function getCurrentDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return new Date(`${date.getFullYear()}-${month}-${day}`);
}

function request(options) {
    return fetch('https://api.myjson.com/bins/9tq93', options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Deu erro tio');
        })
        .catch(error => console.log(error));
}

if (navigator.serviceWorker) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(registration => console.log('Registered events at scope: ', registration.scope))
        .catch(error => console.log(error));
}