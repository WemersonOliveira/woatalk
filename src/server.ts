import "dotenv/config"
import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.send("WOA Talk API online ✅")
})

app.get("/ping", (req, res) => {
  res.send("pong")
})

export default app