import {
  Box,
  Button,
  useTheme
} from "@mui/material"
import { useDispatch } from 'react-redux'
import { setPage } from "../../state"

const Options = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const renderButton = (text, marginBottom) => {
    return (
      <Button
        key={text}
        onClick={async () => {
          dispatch(setPage({ page: text }))
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
        bottom: '110px',
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