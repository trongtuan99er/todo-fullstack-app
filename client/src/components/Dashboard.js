import React from "react";
import { useGlobalContext } from "../context/GolobalContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(()=> {
    if(!user && navigate){
      navigate("/");
    }
  },[user, navigate])
  return ( 
    <h1>DashBoard</h1>
  );
}

export default Dashboard;