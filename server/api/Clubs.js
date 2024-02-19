import mongoose from "mongoose";
import {adminsModel, adminsSchema} from "./Admins.js"; // Admins.js exports the Admin model

const clubsSchema = mongoose.Schema({
  club_name: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" } // Reference Admin model here*/
});

const Club = mongoose.model('clubs', clubsSchema);

export default function clubs(server) {
  server.get('/api/clubs', async (req, res) => {
    console.log("HELLO123")
    const clubs = await Club.find();
    res.json(clubs);
  });

  server.get('/api/clubs/:adminId', async (req, res) => {
    try {
      const { adminId } = req.params;
      const clubs = await Club.find({ adminId });
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.post('/api/clubs', async (req, res) => {
    const { club_name, adminId } = req.body;
    const newClub = new Club({ club_name, adminId });
    const savedClub = await newClub.save();

    res.status(201).json(savedClub);
  });
}
