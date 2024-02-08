import mongoose from "mongoose"

const eventsSchema = mongoose.Schema({
  title: String,
  password: String
})

const eventsModel = mongoose.model('events', eventsSchema)

export default function clubs(server) {

  server.get('/api/events', async (req, res) => {
    res.json(await eventsModel.find())
  })

}