const mongoose = require("mongoose");
//
//              Schema
//
const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxlength: [250, "Message too long. (>250)"],
  },
  seen: {
    type: Bolean,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  // Change this to work with sessions

  // _id
  // name
  // participants: [Object.Id]
  // teamId: Object.Id

  sentTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "toModel",
  },
  toModel: {
    type: String,
    required: true,
    enum: ["User", "Team"],
  },
  sentAt: Date,
  receivedAt: Date,
  seenAt: Date,
});
//
//
//
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
