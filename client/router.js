// Import js-files from pages
import home from './pages/home.js';
import about from './pages/about.js';
import login from './pages/login.js';
import club1 from './pages/club-1.js';
import club2 from './pages/club-2.js';
import club3 from './pages/club-3.js';
import club4 from './pages/club-4.js';
import booking from './pages/booking.js';

// Function to change "location"
async function route() {
    //console.log(location)

    switch (location.hash.replace('#', '')) {
        case 'about':
            console.log('ABOUT');
            $('main').html(await about());
            break;
        case '':
            console.log('HOME');
            $('main').html(home());
            break;
        case 'login':
            console.log('LOGIN');
            $('main').html(login());
            break;
        case 'club-1':
            console.log('CLUB-1');
            $('main').html(club1());
            break;
        case 'club-2':
            console.log('CLUB-2');
            $('main').html(club2());
            break;
        case 'club-3':
            console.log('CLUB-3');
            $('main').html(await club3());
            break;
        case 'club-4':
            console.log('CLUB-4');
            $('main').html(club4());
            break;
        case 'booking':
            console.log('BOOKING');
            $('main').html(booking());
            break;
        default:
            console.log("404 You've broken the internet");
    }
}

window.onhashchange = route;
window.onload = route;
