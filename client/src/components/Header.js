import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/material"
import MyButton from "./Mybutton";
import { useGlobalContext } from "../context/GolobalContext";

const useStyles = makeStyles({
  mainHeader: {
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
    padding: 16,
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerLeft: {
    '& a': {
      color: "#fff",
      fontWeight: 700,
      fontSize: '2rem',
      textDecoration: 'none',
      transition: 'all .3s ease',
      '&:hover': {
        opacity: .7
      }
    }
  }
})

const Header = () => {
  const classes = useStyles()
  const { user, logout } = useGlobalContext();
  const { pathname } = useLocation();
  return ( 
    <Box className={classes.mainHeader}>
      <Box className={classes.headerInner}>
        <Box className={classes.innerLeft}>
          <Link to="/">
            Todo List
          </Link>
        </Box>

        <Box className={classes.innerRight}>
          {user ? (   
              <MyButton onClick={logout}>
                Đăng xuẩt
              </MyButton>) : (
                pathname === '/' ? (
                  <MyButton>
                    <Link to='/register'>
                      Đăng ký 
                    </Link>
                  </MyButton>
                ) : (
                  <MyButton>
                    <Link to='/'>
                      Đăng Nhập 
                    </Link>
                  </MyButton>
                )
            )
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Header;