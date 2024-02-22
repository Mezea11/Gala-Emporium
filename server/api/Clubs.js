import mongoose from "mongoose";
//create schema for club
const clubsSchema = mongoose.Schema({
  club_name: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" } // Reference Admin model here*/
});
//declare model for clubs collection
const Club = mongoose.model('clubs', clubsSchema);

export default function clubs(server) {
  //get all clubs
  server.get('/api/clubs', async (req, res) => {
    console.log("HELLO123")
    const clubs = await Club.find();
    res.json(clubs);
  });
//get club by adminId
  server.get('/api/clubs/:adminId', async (req, res) => {
    try {
      const { adminId } = req.params;
      const clubs = await Club.find({ adminId });
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //post new club
  server.post('/api/clubs', async (req, res) => {
    const { club_name, adminId } = req.body;
    const newClub = new Club({ club_name, adminId });
    const savedClub = await newClub.save();

    res.status(201).json(savedClub);
  });
}
