import {
  Box,
  Button,
  useTheme
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const Options = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const renderButton = (page, text, marginBottom) => {
    return (
      <Button
        onClick={() => { navigate(`/home/${page}`) }}
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
      {renderButton('all', 'All', '8px')}
      {renderButton('notDone', 'Not Done', '8px')}
      {renderButton('done', 'Done')}
    </Box>
  )
}

export default Options