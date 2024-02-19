import mongoose from "mongoose";


// Define the schema for events
const eventsSchema = mongoose.Schema({
  title: String,
  description: String,
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "clubs" },// Reference clubs model
  date: {
    type: Date,
    required: true
  },
  available_tickets: Number
});

// Create the events model
const eventsModel = mongoose.model('events', eventsSchema);

// Export the clubs function
export default function events(server) {

  // Endpoint to get all events
  server.get('/api/events', async (req, res) => {
    try {
      const events = await eventsModel.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    });
    //get 1 event by id

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

    // Endpoint to create a new event and associate it with a club
    server.post('/api/events', async (req, res) => {
      try {
        const { title, description, clubId, date, available_tickets } = req.body;
        const newEvent = new eventsModel({ title, description, clubId, date, available_tickets });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
      } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
      }
    });

  //delete 1 event by id
  server.delete('/api/events/:id', async (req, res) => {
    const id = req.params.id;
    try {
    const deletedEvent = await eventsModel.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(204).send();

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// update whole event by id
  server.put('/api/events/:id', async (req, res) => {
    const id = req.params.id;
    const updatedEvent = req.body;
    try {
      const updatedItem = await eventsModel.findByIdAndUpdate(id, updatedEvent, {new: true })
      
      if (!updatedItem) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.status(200).json(updatedItem);
      console.log('Event updated');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'internal server error' });
    }
  });
// update part of an event by id
  server.patch('/api/events/:id', async (req, res) => {
    const id = req.params.id;
    const partialUpdate = req.body;
    try {
      const updatedItem = await eventsModel.findByIdAndUpdate(id, partialUpdate, {new: true })
      res.status(200).json({ id: id, updatedFields: partialUpdate });

      if (!updatedItem) {
      return res.status(404).json({ error: 'Event not found' });
    }

      console.log('Event partially updated');

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'internal server error' });
    }
  });
  
  }

  
/* 
   Dra in klubb ID till events, koppla ihop
   Skapa en endpoint som låter oss hämta in ett SPECIFIKT event

   Gå in till events, filtrera ut de som har motsvarande klubb ID som de  är associerade med 
   
*/