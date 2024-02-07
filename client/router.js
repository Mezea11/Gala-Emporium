import home from "client\pages\home.js";
import about from "client\pages\about.js";
import contact from "client\pages\contact.js";

async function route() {
  //console.log(location)

  switch (location.hash.replace('#', '')) {
    case "about":
      console.log("ABOUT")
      $('main').html(await about())
      break;
    case "":
      console.log("HOME", home())
      $('main').html(home())
      break;
    case "contact":
      $('main').html(contact())
      break;
    default:
      console.log("404 You've broken the internet")
  }

}

window.onhashchange = route
window.onload = route