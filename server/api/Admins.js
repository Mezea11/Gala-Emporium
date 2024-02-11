import mongoose from "mongoose"

const adminsSchema = mongoose.Schema({
  username: String,
  password: String
})

const adminsModel = mongoose.model('admins', adminsSchema)

export default function admins(server) {

  server.get('/api/admins', async (req, res) => {
    res.json(await adminsModel.find())
  })

}