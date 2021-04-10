const mongoose = require("mongoose");
//
//              Schema
//
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Project",
  },
});
//
//              Virtuals
//
//  Taskovi unutar liste
listSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "listId",
});
//
//
//
const List = mongoose.model("List", listSchema);

module.exports = List;
