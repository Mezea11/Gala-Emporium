// IMPORT SERVER DEPENDENCIES
import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"
import session from "express-session"


// SERVER FUNCTION CALLED
const server = express()
// PORT OPEN ON :80
const port = 80

server.use(express.json())
server.use(express.static('../client'))

server.use(session({
  secret: 'word', // en hemlig nyckel för att signera session-cookie
  resave: false, // undviker att spara sessionen om den inte ändras
  saveUninitialized: true, // spara en ny session som inte har blivit initialiserad
  cookie: { secure: false} // cookie-inställningar, secure bör vara true i produktion med HTTPS
}))

// MONGODB CLUSTER CONNECTION
mongoose.connect("mongodb+srv://christiancastellanosmeza:hello123@gala-emporium-2024.p4a4x4z.mongodb.net/emporium")

// API-REGISTER.JS FUNCTION CALLED
apiRegister(server)

//  LISTENING TO THE SERVER
server.listen(port, () => {
  console.log(`Server open on http://localhost:${port}`)
})