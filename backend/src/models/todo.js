const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  listId: {
    type: Number,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todo", TodoSchema);
