import {
  Box,
  Button,
  useTheme
} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from "../state"

const Options = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { page } = useSelector(state => state)

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
          fontWeight: 'bold',
          backgroundColor: page === text ? theme.palette.selected.default : theme.palette.primary.main,
          "&:hover": {
            // backgroundColor: theme.palette.primary.dark (DESKTOP)
            backgroundColor: theme.palette.selected.default //MOBILE
          }
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