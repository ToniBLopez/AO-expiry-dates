import { Box, Button, TextField, useTheme } from '@mui/material'
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setMessageAlert } from '../../state'
import { useSnackbar } from 'notistack'

const index = () => {
  console.log('iteración')
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const { messageAlert } = useSelector(state => state)
  const formRef = useRef(null)

  const showSnackbar = (type, response) => {
    dispatch(setMessageAlert({ type, message: response.message }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login()
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const login = async () => {
    try {
      const storeValue = document.getElementById('store').value

      const response = await fetch(
        'http://localhost:8080/login',
        // 'http://expirydates.fly.dev/login',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ store: storeValue }),
        }
      )
      const loggedIn = await response.json()

      if (response.ok) {
        console.log(loggedIn.storeId)
        console.log(typeof (loggedIn.storeId)) // String
        showSnackbar('success', loggedIn)
        // dispatch(setLogin({ storeId: 'hi', number: storeValue, token: null }))
        // dispatch((dispatch) => {
        //   dispatch(setLogin({ storeId: loggedIn.storeId, number: storeValue, token: null }))
        //   dispatch(setMessageAlert({ type: 'success', message: loggedIn.message }))
        // })
        // navigate('/home')
      } else {
        /* Handle incorrect store */
        // if (loggedIn.error) {
        //   errors.store = 'Incorrect store number'
        // }
        showSnackbar('error', loggedIn)
        console.error(loggedIn)
      }
    } catch (error) {
      showSnackbar('error', { message: 'Something went wrong' })
      console.error(error)
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