import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("WOA TALK API ONLINE 🚀")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})