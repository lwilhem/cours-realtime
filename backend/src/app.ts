import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json('ip address: http://' + "127.0.0.1" +':'+ PORT);    
})

export default app