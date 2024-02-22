import admins from "./api/Admins.js"
import clubs from "./api/Clubs.js"
import events from "./api/Events.js"
import bookings from "./api/Booking.js"
import login from "./api/Login.js"

// EXPORT API REGISTER 
export default function (server) {
    admins(server)
    clubs(server)
    events(server)
    bookings(server)
    login(server)
}