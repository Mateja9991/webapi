const mongoose = require("mongoose");
const { Schema } = mongoose;
//
//              Schema
//
const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  leader: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
});
//
//              Virtuals
//
//  Projekti ovog tima
teamSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "teamId",
});
//
//
//
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
