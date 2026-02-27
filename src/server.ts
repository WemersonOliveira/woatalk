import 'dotenv/config'
import express from "express";
import communityRoutes from "./routes/community.routes.js";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(communityRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});