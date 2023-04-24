import {
  Box,
  Typography,
  useTheme
} from '@mui/material'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { useDispatch } from 'react-redux'
import { setPage } from '../../state'

const index = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  dispatch(
    setPage({
      page: 'home'
    })
  )

  return (
    <Box>
      <Header />
      <Menu />
    </Box>
  )
}

export default index