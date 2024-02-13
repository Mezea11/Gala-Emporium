import mongoose from "mongoose";

// Define the schema for events
const eventsSchema = mongoose.Schema({
  title: String,
  description: String,
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "clubs" } // Reference clubs model
});

// Create the events model
const eventsModel = mongoose.model('events', eventsSchema);

// Export the clubs function
export default function clubs(server) {

  // Endpoint to get all events
  server.get('/api/events', async (req, res) => {
    try {
      const events = await eventsModel.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    });

    // Endpoint to get events associated with a specific club
    server.get('/api/events/:clubId', async (req, res) => {
      try {
        const { clubId } = req.params;
        const events = await eventsModel.find({ clubId });
        res.json(events);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Endpoint to create a new event and associate it with a club...
    server.post('/api/events', async (req, res) => {
      try {
        const { title, description, clubId } = req.body;
        const newEvent = new eventsModel({ title, description, clubId });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
      } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
      }
    });

  }

  
/* 
   Dra in klubb ID till events, koppla ihop
   Skapa en endpoint som låter oss hämta in ett SPECIFIKT event

   Gå in till events, filtrera ut de som har motsvarande klubb ID som de  är associerade med 
   
*/