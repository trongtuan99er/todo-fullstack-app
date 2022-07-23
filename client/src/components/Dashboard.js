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
    padding: '20px 16px 40px',
  },
  todos: {
    '&:not(:last-child)': {
      marginBottom: 30
    }
  }
})
function Dashboard() {
  const classes = useStyles()
  const { user, completeTodos, incompleteTodos } = useGlobalContext();
  console.log(user);
  const navigate = useNavigate();

  React.useEffect(()=> {
    if(!user && navigate){
      navigate("/");
    }
  },[user, navigate])
  return ( 
    <Box className={classes.root}>
      <Typography variant="h6" color="#fff" marginBottom="px">Hãy thêm việc bạn cần làm !</Typography>
      <AddTodo />
      {incompleteTodos.length > 0 && 
        <Box className={classes.todos}>
          <Typography 
            variant="caption" 
            fontSize="1.25rem"
            marginBottom="10px"
            display="block"
          >
            Việc cần làm:
          </Typography>
          {incompleteTodos.map((todo) => (
            <TodoCard todo={todo} key={todo._id}/>
          ))}
        </Box>}

      {completeTodos.length > 0 && 
        <Box className={classes.todos}>
        <Typography 
          variant="caption" 
          fontSize="1.25rem"
          marginBottom="10px"
          display="block"
        >
          Việc đã xong:
        </Typography>
        {completeTodos.map((todo)=> (
          <TodoCard todo={todo} key={todo._id}/>
        ))}
      </Box>}
    </Box>
  );
}

export default Dashboard;