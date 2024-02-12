import mongoose from "mongoose"

const eventsSchema = mongoose.Schema({
  title: String,
  description: String,
  
})

const eventsModel = mongoose.model('events', eventsSchema)

export default function clubs(server) {

  server.get('/api/events', async (req, res) => {
    res.json(await eventsModel.find())
  })

}


/* 
   Dra in klubb ID till events, koppla ihop
   Skapa en endpoint som låter oss hämta in ett SPECIFIKT event

   Gå in till events, filtrera ut de som har motsvarande klubb ID som de  är associerade med 
   
*/