import React from "react";
import { makeStyles } from '@mui/styles';
import { Box, Typography } from "@mui/material"
import MyButton from './Mybutton' 

const useStyles = makeStyles({
  authBox: {
    maxWidth: 500,
    width: '100%',
    padding: 50,
    backgroundColor: '#2a343f',
    color: '#fff',
    borderRadius: 5
  },
  fieldInput: {
    marginBottom: 30,
    '& label': {
      fontSize: '1rem',
      display: 'block',
      marginBottom: 10
    },
    '& input': {
      backgroundColor: '#1f2732',
      width: '100%',
      color: '#fff',
      padding: 15,
      border: 'none',
      borderRadius: 5,
      outline: 'none'
    }
  },
  footer: {
    '& button': {
      width: '50%',
    }
  },
  error: {
    fontSize: '1.25rem',
  }
})
const AuthBox = ({register}) => {
  const classes = useStyles()
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box className={classes.authBox}>
        <Box mt='20px'>
          <Typography variant='h4' align="center">{register ? 'Đăng ký' : 'Đăng nhập'}</Typography>
        </Box>
        <form>
          {register && (
              <Box className={classes.fieldInput}>
                <label htmlFor="">Tên</label>
                <input type="text" />
              </Box>
            )}
            <Box className={classes.fieldInput}>
              <label htmlFor="">Email</label>
              <input type="text" />
            </Box>
            <Box className={classes.fieldInput}>
              <label htmlFor="">Mật khẩu</label>
              <input type="password" />
            </Box>
            {register && (
              <Box className={classes.fieldInput}>
                <label htmlFor="">Xác nhận m ật khẩu</label>
                <input type="password" />
            </Box>
            )}
            <Box 
              alignItems='center' 
              display='flex' 
              justifyContent='center' 
              flexDirection='column'
              className={classes.footer}
            >
              <Typography 
                display='block' 
                color="error" 
                my='10px'
                className={classes.error}
              >
                có lỗi
              </Typography>
              <MyButton>
                {register ? 'Đăng ký' : 'Đăng nhập'}
              </MyButton>
            </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AuthBox;