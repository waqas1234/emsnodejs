const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// routes //
const authenticationroutes = require("./src/routes/authentication/authenticationroutes");
const eventroutes = require("./src/routes/Events/eventroutes");
const companyroutes = require("./src/routes/Companies/companyroutes");
app.use("/", authenticationroutes);
app.use("/", eventroutes);
app.use("/", companyroutes);
// end routes //
const port = 3001;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on("generate_notification", ({ event, date, time, location }) => {
    socket.broadcast.emit("notifyUser", {
      message: "New event added to the list",
    });
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected`);
  });
});

// mondo db connection //
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1/eventmanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// start serve //
server.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
