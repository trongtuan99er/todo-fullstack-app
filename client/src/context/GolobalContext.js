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
    default: 
      return state;
  }
}

// create the context
export const GlobalContext = createContext(initState)


// create provider

export const GlobalProvider = (props) => {

  const [state, dispatch] = useReducer(GlobalReducer, initState)

  // action get current user
  const value = {
    ...state,
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