import React from 'react'
import { makeStyles } from '@mui/styles';
import { Box, TextareaAutosize } from "@mui/material"
import clsx from 'clsx'
import axios from 'axios';
import { useGlobalContext } from '../context/GolobalContext';

const useStyles = makeStyles({
  todo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    backgroundColor: '#2a343f',
    padding: 10,
    borderRadius: 5,
    '&:not(:last-child)': {
      marginBottom: 15
    }
  },
  todoControl: {
    display: 'flex',
    '& button': {
      display: 'block',
      padding: 0,
      backgroundColor: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      marginLeft: 10,
      '&:not(:last-child)': {
        marginRight: 10,
      },
      '&:hover': {
        cursor: 'pointer',
        opacity: 0.7,
      }
    }
  },
  todoItem: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    border: 'none',
    fontSize: '1.125rem',
    color: '#fff',
    flexGrow: 1,
    outline: 'none'
  },
  todoComplete: {
    '& textarea[type="text"]': {
      textDecoration: 'line-through'
    }
  }
})

const TodoCard = ({todo}) => {
  const classes = useStyles()
  const [content, setContent] = React.useState(todo.content)
  const [editing, setEditing] = React.useState(false)
  const inputRef = React.useRef(null)
  const { todoComplete, todoInComplete, removeTodo, updateTodo } = useGlobalContext()
  
  const onEdit = (e) => {
    e.preventDefault()
    setEditing(true)
    inputRef.current.focus()
  }
  const stopEditing = (e) => {
    if(e)
      e.preventDefault()
    setEditing(false)
    setContent(todo.content)
  }

  const makeComplete = e => {
    e.preventDefault()
    axios.put(`/api/todos/${todo._id}/complete`).then(res => {
      todoComplete(res.data)
    })
  }

  const makeInComplete = e => {
    e.preventDefault()
    axios.put(`/api/todos/${todo._id}/incomplete`).then(res => {
      todoInComplete(res.data)
    })
  }

  const deleteTodo = e => {
    e.preventDefault()
    if(window.confirm("Xoá công việc này chứ ?")){
      axios.delete(`/api/todos/${todo._id}`).then(()=>{
        removeTodo(todo)
      })
    }
  }
  
  const saveTodo = e => {
    e.preventDefault()
    axios.put(`/api/todos/${todo._id}`, {content}).then(res => {
      updateTodo(res.data)
      setEditing(false)
    }).catch(()=>{
      stopEditing()
    })
  }

  return (
    <Box className={clsx(classes.todo, todo.complete ? classes.todoComplete : "" )}>
      <input type="checkbox" 
        checked={todo.complete}
        onChange={!todo.complete ? makeComplete : makeInComplete}
      />
      <TextareaAutosize 
        className={classes.todoItem}
        minRows={1}
        maxRows={5}
        type="text" 
        ref={inputRef} 
        value={content} 
        readOnly={!editing}
        onChange={e => setContent(e.target.value)}
      />

      <Box className={classes.todoControl}>
      {!editing ? (
        <>
          {!todo.complete && <button onClick={onEdit}>Sửa</button>}
          <button onClick={deleteTodo}>Xoá</button>
        </>
      ) : (
        <>
          <button onClick={stopEditing}>Huỷ</button>
          <button onClick={saveTodo}>Lưu</button>
        </>
      )}
      </Box>
    </Box>
  )
}

export default TodoCard