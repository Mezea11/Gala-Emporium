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


/*
server.get('/api/clubs/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await adminsModel.findById(adminId).populate('clubId'); // Populate the 'clubId' field
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    const clubs = admin.clubId; // Get the clubs associated with the admin
    res.json(clubs);
  } catch (error) {
    console.error("Error in getting clubs for admin", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
/* 
    // Endpoint to get events associated with a specific club
    server.get('/api/clubs/:adminId', async (req, res) => {
      try {
        const { clubId } = req.params;
        const clubs = await adminsModel.find({ clubId });
        res.json(events);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
*/


/* 
server.get('/api/clubs/:adminId', async (req, res) => {
  try {
    const { adminId } = req.params;
    const club = await Club.find({ adminId }); // Find club by adminId
    if (!club) {
      return res.status(404).json({ error: 'Club not found for this admin' });
    }
    res.json(club);
  } catch (error) {
    console.error("Error in getting club for admin", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/


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