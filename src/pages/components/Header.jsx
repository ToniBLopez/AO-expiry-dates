import {
  Box,
  Typography,
  useTheme
} from '@mui/material'
import { useSelector } from 'react-redux'

function Header() {
  const theme = useTheme()
  const { page } = useSelector(state => state)

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          mt: '50px',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            textTransform: 'uppercase'
          }}
        >
          {page}
        </Typography>
      </Box>
    </Box>
  )
}

export default Header