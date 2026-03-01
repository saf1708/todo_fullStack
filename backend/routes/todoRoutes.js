const express = require("express");
const router = express.Router();


const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  searchTodo,
} = require("../controller/todoController");
const { auth } = require("../middleware/authMiddleware");

router.post("/", auth, createTodo);
router.get("/", auth, getAllTodos);
router.get("/search", auth, searchTodo);
router.put("/update/:id", auth, updateTodo);
router.delete("/delete/:id", auth, deleteTodo);

module.exports = router; 