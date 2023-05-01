import {
  Box,
  Checkbox,
  Typography,
  useTheme
} from '@mui/material'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { useSelector, batch, useDispatch } from 'react-redux'
import { useEffect, useState, memo } from 'react'
import getProducts from '../utils/getProducts'

const index = () => {
  console.log('renders')
  const [loading, setLoading] = useState(true)
  const { products } = useSelector(state => state)
  const dispatch = useDispatch()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const theme = useTheme()

  useEffect(() => {
    console.log('dentro de getProducts useEffect')
    const fetchProducts = async () => {
      await getProducts(batch, dispatch, 'done')
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <Box>
      <Header />
      <Box
        sx={{
          width: '100%',
          p: '0px 30px',
          mb: '120px'
        }}
      >
        {loading
          ?
          <Typography>Loading...</Typography>
          :
          Object.keys(products).map(
            el => {
              const date = new Date(el);
              const formatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
              const formattedDate = date.toLocaleDateString('es-ES', formatOptions).replace(/\//g, '.');
              return (
                <Box
                  key={formattedDate}
                  sx={{
                    width: '100%',
                    mb: '8px'
                  }}
                >
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.main
                    }}
                  >
                    {formattedDate}
                  </Typography>
                  {
                    products[el].map(el =>
                      <Box
                        key={JSON.stringify(el)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox {...label} />
                        <Typography
                          variant='p'
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          {el.name}
                        </Typography>
                      </Box>
                    )
                  }
                </Box>
              )
            }
          )
        }
      </Box>
      <Menu />
    </Box>
  )
}

export default memo(index)
// export default index