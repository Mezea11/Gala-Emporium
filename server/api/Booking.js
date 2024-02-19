import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({
    name: String,
    email: String,
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Events" }, // Reference Admin model here*/ 
    tickets: Number
})

const booking = mongoose.model('bookings', bookingSchema)

export default function bookings(server) {
    
    server.get('/api/booking', async (req, res) => {
        try {
            console.log("hello world")
            const bookings = await booking.find();
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
    }
    });
    
      server.post('/api/booking', async (req, res) => {
        try {
            const { name, email, eventId, tickets } = req.body;
            const newBooking = new booking({ name, email, eventId, tickets });
            const savedBooking = await newBooking.save();
    
            res.status(201).json(savedBooking);
        } catch (error) {
            res.status(400).json({ error: 'Bad Request' });
        }
      });
      // delete 1 booking by id
      server.delete('/api/booking/:id', async (req, res) => {
        const id = req.params.id;
        try {
        const deletedBooking = await booking.findByIdAndDelete(id);
    
        if (!deletedBooking) {
          return res.status(404).json({ error: 'Booking not found' });
        }
    
        res.status(204).send();
    
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    // update whole event by id
      server.put('/api/booking/:id', async (req, res) => {
        const id = req.params.id;
        const updatedBooking = req.body;
        try {
          const updatedItem = await booking.findByIdAndUpdate(id, updatedBooking, {new: true })
          
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
      server.patch('/api/booking/:id', async (req, res) => {
        const id = req.params.id;
        const partialUpdate = req.body;
        try {
          const updatedItem = await booking.findByIdAndUpdate(id, partialUpdate, {new: true })
          res.status(200).json({ id: id, updatedFields: partialUpdate });
    
          if (!updatedItem) {
          return res.status(404).json({ error: 'Booking not found' });
        }
    
    //      res.status(200).json(updatedItem);
          console.log('Booking partially updated');
    
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'internal server error' });
        }
      });
      
}

