const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogsSchema = new Schema({
  log: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  companyid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Logs = mongoose.model("logs", LogsSchema);
