const mongoose = require("mongoose");
//
//              Schema
//
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Team",
  },
});
//
//              Virtuals
//
//  Liste taskova unutar projekta
projectSchema.virtual("lists", {
  ref: "List",
  localField: "_id",
  foreignField: "projectId",
});
//
//
//
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
