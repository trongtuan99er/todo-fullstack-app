import React from "react";
import { useGlobalContext } from "../context/GolobalContext";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box, Typography } from "@mui/material"
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";

const useStyles = makeStyles({
  root: {
    maxWidth: 768,
    margin: '0 auto',
    width: '100%',
    padding: 16,
  },
  todos: {
    '&:not(:last-child)': {
      marginBottom: 30
    }
  },
  todoTitle: {
    fontSize: '2rem',
    marginBottom: 15,
  }
})
function Dashboard() {
  const classes = useStyles()
  const { user, completeTodos, incompleteTodos } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(()=> {
    if(!user && navigate){
      navigate("/");
    }
  },[user, navigate])
  return ( 
    <Box className={classes.root}>
      <AddTodo />
      <Box className={classes.todos}>
        {incompleteTodos.map((todo) => (
          <TodoCard todo={todo} key={todo._id}/>
        ))}
      </Box>

      {completeTodos.length > 0 && 
        <Box className={classes.todos}>
        <Typography className={classes.todoTitle}>Công việc đã xong:</Typography>
        {completeTodos.map((todo)=> (
          <TodoCard todo={todo} key={todo._id}/>
        ))}
      </Box>}
    </Box>
  );
}

export default Dashboard;