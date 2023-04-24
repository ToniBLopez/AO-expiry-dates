import { Box, TextField, Button, useTheme } from "@mui/material"

function AddDates() {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          bottom: '120px',
          height: '180px',
          width: '300px',
          justifyContent: 'space-between',
          borderRadius: '8px',
          p: '10px',
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <TextField
          required
          label='Name'
          name='name'
          placeholder='Pechuga de Pollo'
          variant='outlined'
          sx={{
            color: theme.palette.primary.main
          }}
        />

        <TextField
          required
          label='Date'
          name='date'
          placeholder='DD.MM.YYYY'
          variant='outlined'
          sx={{
            color: theme.palette.primary.main
          }}
        />

        <Button
          type='submit'
          variant='contained'
          // onClick={() => true}
        >
          Send
        </Button>
      </Box>
    </>
  )
}

export default AddDates