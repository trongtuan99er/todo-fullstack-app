import * as React from 'react';
import { styled } from '@mui/styles';

const StyleButton = styled('button')({
    display: 'inline-block',
    backgroundColor: '#00a796',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 5,
    fontSize: '1rem',
    color: '#fff',
    transition: 'all .2s ease',
    '&:hover': {
      backgroundColor: '#026158',
      cursor: 'pointer'
    },
    '& a': {
      textDecoration: 'none',
      color: '#fff'
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: .5
    }
});

export default function MyButton({children, onClick}) {
  return <StyleButton onClick={onClick}>{children}</StyleButton>;
}
