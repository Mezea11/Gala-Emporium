// IMPORT SERVER DEPENDENCIES
import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"

// SERVER FUNCTION CALLED
const server = express()
// PORT OPEN ON :80
const port = 80

server.use(express.json())
server.use(express.static('../client'))

// MONGODB CLUSTER CONNECTION
mongoose.connect("mongodb+srv://christiancastellanosmeza:hello123@gala-emporium-2024.p4a4x4z.mongodb.net/")

// API-REGISTER.JS FUNCTION CALLED
apiRegister(server)

//  LISTENING TO THE SERVER
server.listen(port, () => {
  console.log(`Server open on http://localhost:${port}`)
})