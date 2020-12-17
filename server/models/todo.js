const mongoose = require("mongoose");
const User = require("./user");

// build a simple schema where all our todos will just have a task
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      maxLength: 160
    },
    done: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.todos.remove(this.id);
    await user.save();

    return next();
  } catch (err) {
    return next(err);
  }
});

// make a modal and then export it out
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
