const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo")
const requiresAuth = require("../middleware/permission")
const valdateTodoInput = require("../validation/todoValdation")
// @route   GET /apt/todos/test
// @desc    Test todos route
// @acess   Public
router.get("/test", (req, res) => {
  res.send("Todos route working")
});

// @route   POST /apt/todos/new
// @desc    Create a new todo
// @acess   Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    // validate todo input request
    const { errors, isValid } = valdateTodoInput(req.body)
    if(!isValid) {
      return res.status(400).json(errors)
    }
    // create a new todo
    const newTodo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false
    })

    // save the new todo
    await newTodo.save();

    return res.json(newTodo)

  }catch(err) {
    console.log(err);

    return res.status(500).send(err.message)
  }
});

// @route   GET /apt/todos/current
// @desc    Current user todos
// @acess   Private
router.get("/current",requiresAuth, async (req, res) => {
  try {
    // find complete todos of current user
    const completeTodos = await ToDo.find({
        user: req.user._id,
        complete: true,
      }).sort({completeAt: -1})
    
    // find incomplete todos of current user
    const incompleteTodos = await ToDo.find({
      user: req.user._id,
      complete: false,
    }).sort({createdAt: -1})

    return res.json({
      incomplete: incompleteTodos,
      complete: completeTodos
    })
  }catch(err) {
    console.log(err);
    return res.status(500).send(err.message)
  }
})

module.exports = router