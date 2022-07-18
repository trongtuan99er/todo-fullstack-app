import React from "react";
import { makeStyles } from '@mui/styles';
import { Box, Typography } from "@mui/material"
import MyButton from './Mybutton' 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GolobalContext";

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
      outline: 'none',
      fontSize: '1.25rem'
    }
  },
  footer: {
    '& button': {
      width: '50%',
    }
  },
  error: {
    fontSize: '1.25rem',
  },
  authRegister: {
    fontSize: '1.5rem',
    '& p': {
      marginBottom: 0,
    },
    '& a': {
      textDecoration: 'none',
      color: '#fff',
      fontWeight: 700,
      transition: 'all .3s ease',
      '&:hover': {
        opacity: .7
      }
    }
  }
})
const AuthBox = ({register}) => {
  const { getCurrentUser, user } = useGlobalContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("")
  const [name, serName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({})

  React.useEffect(()=> {
    if(user && navigate){
      navigate("/dashboard");
    }
  },[user,navigate])
  const classes = useStyles()

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {};
    if(register) {
      data = {
        name,
        email,
        password,
        confirmPassword
      }
    }else{
      data = {
        email,
        password
      }
    }
    axios.post(register ? '/api/auth/register' : '/api/auth/login', data).then(()=>{
      getCurrentUser();
    }).catch(err => {
      setLoading(false);

      if(err?.response?.data) {
        setErrors(err.response.data)
      }
    }) 
  }
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box className={classes.authBox}>
        <Box mt='20px'>
          <Typography variant='h4' align="center">{register ? 'Đăng ký' : 'Đăng nhập'}</Typography>
        </Box>
        <form onSubmit={onSubmit}>
          {register && (
              <Box className={classes.fieldInput}>
                <label htmlFor="">Tên</label>
                <input type="text" value={name} onChange={e => serName(e.target.value)} />
                {errors.name && ( 
                  <Typography variant="caption" color="error">{errors.name}</Typography>
                )}
              </Box>
            )}
            <Box className={classes.fieldInput}>
              <label htmlFor="">Email</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
              {errors.email && ( 
                  <Typography variant="caption" color="error">{errors.email}</Typography>
                )}
            </Box>
            <Box className={classes.fieldInput}>
              <label htmlFor="">Mật khẩu</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              {errors.password && ( 
                  <Typography variant="caption" color="error">{errors.password}</Typography>
                )}
            </Box>
            {register && (
              <Box className={classes.fieldInput}>
                <label htmlFor="">Xác nhận mật khẩu</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword && ( 
                  <Typography variant="caption" color="error">{errors.confirmPassword}</Typography>
                )}
            </Box>
            )}
            <Box 
                alignItems='center' 
                display='flex' 
                justifyContent='center' 
                flexDirection='column'
                className={classes.footer}
              >
              {Object.keys(errors).length > 0 && (
                <Typography 
                  display='block' 
                  color="error" 
                  my='10px'
                  className={classes.error}
                >
                {register ? "Bạn vui lòng kiểm tra lại thông tin đăng ký" : errors.error}
                </Typography>
              )}
                <MyButton type='submit' disabled={loading}>
                  {register ? 'Đăng ký' : 'Đăng nhập'}
                </MyButton>
                {!register ? (
                  <Box textAlign='center' marginTop='20px' className={classes.authRegister}>
                    <Typography variant="caption" color="white">
                      Chưa có tài khoản ? <Link to='/register'>
                        Đăng ký ngay
                      </Link>
                    </Typography>
                  </Box>
                ) : (
                  <Box textAlign='center' marginTop='20px' className={classes.authRegister}>
                    <Typography variant="caption" color="white">
                      Đã có tài khoản ? <Link to='/'>
                        Đăng nhập ngay
                      </Link>
                    </Typography>
                  </Box>
                )}
            </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AuthBox;