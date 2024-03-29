// Import js-files from pages
import home from './pages/home.js';
import about from './pages/about.js';
import login from './pages/login.js';
import club1 from './pages/club-1.js';
import club2 from './pages/club-2.js';
import club3 from './pages/club-3.js';
import club4 from './pages/club-4.js';
import booking from './pages/booking.js';
import admin from './pages/admin.js';

// Function to change "location"
async function route() {
  switch (location.hash.replace('#', '')) {
    case "about":
      console.log("ABOUT")
      $('main').html(about())
      break;
    case "":
      console.log("HOME")
      $('main').html(await home())
      break;
    case "login":
      console.log("LOGIN")
      $('main').html(login())
      break;
    case "club-1":
      console.log("CLUB-1");
      $('main').html(await club1())
      break;
    case "club-2":
      console.log("CLUB-2");
      $('main').html(await club2())
      break;
    case "club-3":
      console.log("CLUB-3");
      $('main').html(await club3())
      break;
    case "club-4":
      console.log("CLUB-4");
      $('main').html(await club4())
      break;
    case "booking":
      console.log("BOOKING");
      $('main').html(await booking())
      break;
    case "admin":
      const response = await fetch('/api/check-login', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    if (data.loggedIn) {
        console.log("Admin logged in");
        $('main').html(await admin());
    } else {
        console.log("Admin not logged in");
    }
    break;
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route;
window.onload = route;
