import { Box, Button, TextField, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../state'

const index = () => {
  const { palette } = useTheme()
  console.log('iteración')
  const formRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    login()

    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const login = async () => {
    try {
      const store = document.getElementById('store').value

      const response = await fetch(
        'http://localhost:8080/login',
        // 'http://expirydates.fly.dev/login',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            store,
          })
        }
      )
      loggedIn = await response.json()
      console.log(loggedIn)
      console.log(response.ok)
      if (response.ok) {
        // dispatch(
        //   setLogin({
        //     store: loggedIn.store,
        //     token: loggedIn.token,
        //   })
        // )
        // navigate('/home')
      } else {
        /* Handle incorrect store */
        // if (loggedIn.error) {
        //   errors.store = 'Incorrect store number'
        // }
        console.error(loggedIn)
      }
    } catch (error) {
      console.error(error)
    }
  }

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