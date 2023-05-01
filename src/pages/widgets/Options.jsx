import {
  Box,
  Button,
  useTheme
} from "@mui/material"
import getProducts from "../utils/getProducts"
import { batch, useDispatch } from 'react-redux'

const Options = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const renderButton = (text, marginBottom) => {
    return (
      <Button
        key={text}
        onClick={async () => {
          await getProducts(batch, dispatch, text)
        }}
        variant='contained'
        sx={{
          mb: marginBottom,
          fontWeight: 'bold'
        }}
      >
        {text}
      </Button>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        bottom: '100px',
        right: '40px',
        width: '150px',
        justifyContent: 'space-between',
        textAlign: 'center',
        borderRadius: '8px',
        p: '10px',
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      {renderButton('all', '8px')}
      {renderButton('not done', '8px')}
      {renderButton('done')}
    </Box>
  )
}

export default Options