import mongoose from "mongoose";
import {adminsModel, adminsSchema} from "./Admins.js"; // Assuming Admins.js exports the Admin model

adminsModel

const clubsSchema = mongoose.Schema({
  club_name: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" } // Reference Admin model here*/
});

const Club = mongoose.model('clubs', clubsSchema);

export default function clubs(server) {
  server.get('/api/clubs', async (req, res) => {
    console.log("HELLO123")
    const clubs = await Club.find();
    res.json(clubs);
  });

  server.post('/api/clubs', async (req, res) => {
    const { club_name, adminId } = req.body;
    const newClub = new Club({ club_name, adminId });
    const savedClub = await newClub.save();

    res.status(201).json(savedClub);
  });
}
