import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"

const server = express()
const port = 80

server.use(express.json())
server.use(express.static('../client'))

mongoose.connect("mongodb+srv://christiancastellanosmeza:hello123@gala-emporium-2024.p4a4x4z.mongodb.net/")

apiRegister(server)

server.listen(port, () => {
  console.log(`Server open on http://localhost:${port}`)
})