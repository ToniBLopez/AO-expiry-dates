import { Box, Button, TextField, useTheme } from '@mui/material'
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import { setMessageAlert } from '../../state'
import login from '../../utils/frontendRequests/CREATE/login'

const index = () => {
  console.log('iteración')
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { palette } = useTheme()
  const formRef = useRef(null)
  const { messageAlert } = useSelector(state => state)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    login(dispatch, navigate)
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  useEffect(() => {
    if (messageAlert.type.length !== 0) {
      enqueueSnackbar(messageAlert.message, {
        variant: messageAlert.type,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
      })
      dispatch(setMessageAlert({ type: '', message: '' }))
    }
  }, [messageAlert])

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        <TextField
          required
          id='store'
          label='Store Number'
          name='store number'
          type='text'
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]{0,3}',
            maxLength: 3,
          }}
          placeholder='095'
        />
        <Button
          type='submit'
          variant='contained'
          sx={{
            fontWeight: 'bold',
            "&:hover": {
              backgroundColor: palette.selected.default
            },
          }}
        >
          Log In
        </Button>
      </Box >
    </form>
  )
}

export default index