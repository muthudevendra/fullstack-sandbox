module.exports = function (app) {
  var todoList = require("../controllers/todo");

  // todoList Routes
  app.route("/todos").get(todoList.listAllTodos).post(todoList.createNewTodo);
  app.route("/todo/:id").put(todoList.updateTodo).delete(todoList.deleteTodo);
};
