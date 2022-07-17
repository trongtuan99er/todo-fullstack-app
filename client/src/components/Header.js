import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/material"

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
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#00a796',
    padding: '10px 20px',
    border: 'none',
    color: '#fff',
    borderRadius: 5,
    fontSize: '1rem',
    transition: 'all .2s ease',
    '&:hover': {
      backgroundColor: '#026158',
      cursor: 'pointer'
    }
  }

})

const Header = () => {
  const classes = useStyles()
  return ( 
    <Box className={classes.mainHeader}>
      <Box className={classes.headerInner}>
        <Box className={classes.innerLeft}>
          <Link to="/">
            Todo List
          </Link>
        </Box>

        <Box className={classes.innerRight}>
          <button className={classes.btn}>
            Đăng Xuất
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;