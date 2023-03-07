// server/index.js

const express = require("express");
const googleHandler = require("./google-handler.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Used to serve the files for the built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/get-events", (req, res) => {
  googleHandler.getEvents()
    .then((events) => { console.log(events); res.json(events) });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});