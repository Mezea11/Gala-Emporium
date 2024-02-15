//import Home from "./api/home.js"
import about from "./api/about.js"
import admins from "./api/Admins.js"
import clubs from "./api/Clubs.js"
import events from "./api/Events.js"
import bookings from "./api/Booking.js"

// EXPORT API REGISTER 
export default function (server) {
    about(server)
    admins(server)
    clubs(server)
    events(server)
    bookings(server)
}