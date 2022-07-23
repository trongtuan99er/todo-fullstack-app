import React , {createContext, useContext, useReducer, useEffect} from  'react'
import axios from 'axios'

// initState
const initState  = {
  user: null,
  fetchingUser: true,
  completeTodos: [],
  incompleteTodos: []
}

// globalReducer
const GlobalReducer = (state, action ) => {
  switch (action.type) {
    case "SET_USER": 
      return {
        ...state,
        user: action.payload,
        fetchingUser: false
      }
    case "SET_COMPLETE_TODO": 
      return {
        ...state,
        completeTodos: action.payload,
      }
    case "SET_INCOMPLETE_TODO": 
      return {
        ...state,
        incompleteTodos: action.payload,
      }
    case "RESET_USER":
      return {
        ...state,
        user: null,
        fetchingUser: false,
        completeTodos: [],
        incompleteTodos: []
      }
    default: 
      return state;
  }
}

// create the context
export const GlobalContext = createContext(initState)


// create provider

export const GlobalProvider = (props) => {

  const [state, dispatch] = useReducer(GlobalReducer, initState)

  useEffect(()=> {
    getCurrentUser();
  },[])
  // action get current user
  const getCurrentUser = async() => {
    try{
      const res = await axios.get("/api/auth/current")
      if(res.data) {
        const todoRes = await axios.get("/api/todos/current")

        if(todoRes.data) {
          dispatch({type: "SET_USER", payload: res.data})
          dispatch({
            type: "SET_COMPLETE_TODO", 
            payload: todoRes.data.complete
          })
          dispatch({
            type: "SET_INCOMPLETE_TODO", 
            payload: todoRes.data.incomplete
          })
        }
      }else {
        dispatch({type: "RESET_USER"})
      }
    }catch(err) {
      console.log(err);
      dispatch({type: "RESET_USER"})
    }
  }
  // logout current user
  const logout = async () => {
    try{
      await axios.put("/api/auth/logout");
      dispatch({type: "RESET_USER"})
    }catch(err){
      console.log(err);
      dispatch({type: "RESET_USER"})
    }
  }
  
  // add new todo
  const addTodo = (todo) => {
    dispatch({
      type: "SET_INCOMPLETE_TODO",
      payload: [todo, ...state.incompleteTodos]
    })
  }

  // make todo complete
  const todoComplete = (todo) => {
    dispatch({
      type: "SET_INCOMPLETE_TODO",
      payload: state.incompleteTodos.filter(
        (incompleteTodo) => incompleteTodo._id !== todo._id
      )
    })
    dispatch({
      type: "SET_COMPLETE_TODO",
      payload: [todo, ...state.completeTodos]
    })
  }

  // make todo incomplete
  const todoInComplete = (todo) => {
    dispatch({
      type: "SET_COMPLETE_TODO",
      payload: state.completeTodos.filter(
        (completeTodo) => completeTodo._id !== todo._id
      )
    })

    const newIncompleteTodos = [todo, ...state.incompleteTodos]

    dispatch({
      type: "SET_INCOMPLETE_TODO",
      payload: newIncompleteTodos.sort(
        (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    })
  }
  // remove todo
  const removeTodo = (todo) => {
    if(todo.complete){
      dispatch({
        type: "SET_COMPLETE_TODO",
        payload: state.completeTodos.filter(
          (completeTodo) => completeTodo._id !== todo._id
        )
      })
    }else {
      dispatch({
        type: "SET_INCOMPLETE_TODO",
        payload: state.incompleteTodos.filter(
          (incompleteTodo) => incompleteTodo._id !== todo._id
        )
      })
    }
  }
  const value = {
    ...state,
    getCurrentUser,
    logout,
    addTodo,
    todoComplete,
    todoInComplete,
    removeTodo
  }
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider> 
  )
}

export function useGlobalContext(){
  return useContext(GlobalContext)
}