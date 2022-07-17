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
// @desc    Get Current user todo list
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

// @route   PUT /apt/todos/:todoId/complete
// @desc    Make todo to complete state
// @acess   Private

router.put("/:todoId/complete", requiresAuth, async(req, res) => {
  try{ 
    const todo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.todoId
    });

    if(!todo) {
      return res.status(404).json({error: "Không thể tìm thấy việc cần làm"})
    }
    if(todo.complete) {
      return res.status(400).json({error: "việc cần làm đã hoàn thành "})
    }

    const updatedTodo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.todoId
      },
      {
        complete: true,
        completeAt: new Date()
      },
      {
        new: true
      }
    )
    return res.json(updatedTodo);
  }catch(err) {
    console.log(err);
    return res.status(500).send(err.message)
  }
})


// @route   PUT /api/todos/:todoId
// @desc    Update new todo content
// @acess   Private

router.put("/:todoId", requiresAuth, async(req, res)=> {
  try {
    const todo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.todoId
    })

    if(!todo) {
      return res.status(404).json({error: "Không thể tìm thấy việc cần làm"})
    }
    
    // validate new tdo content
    const { errors, isValid } = valdateTodoInput(req.body)
    if(!isValid) {
      return res.status(400).json(errors)
    }
    // update new content after validate
    const updatedTodo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.todoId
      },
      {
        content: req.body.content,
      },
      {
        new: true
      }
    )
    return res.json(updatedTodo)

  }catch(err){
    console.log(err);
    return res.status(500).send(err.message)
  }
});

// @route   DELETE /api/todos/:todoId
// @desc    Delete a todo
// @acess   Private
router.delete("/:todoId", requiresAuth, async(req, res)=> {
  try{
    // find todo of current user
    const todo = await ToDo.find({
      user: req.user._id,
      _id: req.params.todoId
    })

    if(!todo) {
      return res.status(404).json({error: "Không thể tìm thấy việc cần làm"})
    }

    // remove todo from db
    await ToDo.findOneAndRemove({
        user: req.user._id,
        _id: req.params.todoId
      });

    return res.json({sucess: true})

  }catch(err){
    console.log(err);
    return res.status(500).send(err.message)
  }
});

module.exports = router