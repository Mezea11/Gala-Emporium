import mongoose from "mongoose"
import Club from "./Clubs.js";

// Admin schema created: Username/Password has boolean
export const adminsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "clubs" }
})

export const adminsModel = mongoose.model('admins', adminsSchema)


// Export all admins functions to server
export default function admins(server) {

  // Get admins
  server.get('/api/admins', async (req, res) => {
    res.json(await adminsModel.find())
  })


  //Post admin
  server.post('/api/admins', async (req, res) => {
    try{
      await adminsModel.create(req.body)
      res.sendStatus(201)
    }catch(e){
      console.log("Error in creating admin", e);
      res.status(409).end()
    }
  })
}