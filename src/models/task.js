const mongoose = require("mongoose");
//
//              Schema
//
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      requred: true,
      ref: "List",
    },
    parentTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    editors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//
//              Virtuals
//
//  Podtaskovi unutar taska
taskSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "parentTaskId",
});
//
//
//
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
