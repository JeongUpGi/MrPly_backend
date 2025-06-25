require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const youtubeRouter = require("./routes/youtube");
app.use("/api", youtubeRouter);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
