//import Home from "./api/home.js"
import about from "./api/About.js"
import admins from "./api/Admins.js"
import clubs from "./api/Clubs.js"
import events from "./api/Events.js"

// EXPORT API REGISTER 
export default function (server) {
    about(server)
    admins(server)
    clubs(server)
    events(server)
}