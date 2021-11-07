const mongoose = require("mongoose");

const uri = `mongodb+srv://sellpy:sellpy@cluster0.fcspg.mongodb.net/todo?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    console.log("Error connecting Database instance due to:", err);
  }
);
