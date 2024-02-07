// Import js-files from pages
import home from "./pages/home.js";
import about from "./pages/about.js";
import login from "./pages/login.js";
import club1 from "./pages/club-1.js"

// Function to change "location"
async function route() {
  //console.log(location)

  switch (location.hash.replace('#', '')) {
    case "about":
      console.log("ABOUT")
      $('main').html(await about())
      break;
    case "":
      console.log("HOME")
      $('main').html(home())
      break;
    case "login":
      console.log("LOGIN")
      $('main').html(login())
      break;
    case "club-1":
      console.log("CLUB-1");
      $('main').html(club1())
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route
window.onload = route