import React from 'react'
import { makeStyles } from '@mui/styles';
import MyButton from '../components/Mybutton'
import axios from 'axios';
import { useGlobalContext } from '../context/GolobalContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2a343f',
    marginBottom: 30,
    borderRadius: 5,
    '& input': {
      width: '100%',
      marginRight: 20,
      fontSize: '1.125rem',
      padding: '9px 15px',
      backgroundColor: '#1f2732',
      border: 'none',
      borderRadius: 5,
      color: '#fff',
      '&:focus': {
        outline: 'none'
      }
    }
  },

})

const AddTodo = () => {
  const { addTodo } = useGlobalContext()
  const [content, setContent] = React.useState("")
  const classes = useStyles()

  const onSubmitForm = e => {
    e.preventDefault()

    axios.post("api/todos/new", {content}).then(res => {
      setContent("");
      addTodo(res.data)
    })
  }

  return (
    <form onSubmit={onSubmitForm} className={classes.root}>
      <input type="text" value={content} onChange={e => setContent(e.target.value)} />

      <MyButton className={classes.addBtn} type='submit' disabled={content.length === 0}>
        Thêm
      </MyButton>
    </form>
  )
}

export default AddTodo