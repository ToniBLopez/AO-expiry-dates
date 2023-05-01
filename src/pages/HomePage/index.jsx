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
  const { products, page } = useSelector(state => state)
  const dispatch = useDispatch()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const theme = useTheme()

  const patchDone = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/products/updateDone`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ productId: _id }),
        }
      )
      const updatedDate = await response.json();
      if (response.ok) {
        console.log(updatedDate.message)
        await getProducts(batch, dispatch, page)
      } else {
        console.error(updatedDate.message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts(batch, dispatch, 'home')
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
            (el, index) => {
              const date = new Date(el);
              const formatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
              const formattedDate = date.toLocaleDateString('es-ES', formatOptions).replace(/\//g, '.');
              return (
                <Box
                  key={index}
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
                    products[el].map((el, index) =>
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox
                          checked={el.done}
                          onClick={() => patchDone(el._id)}
                          sx={{
                            zIndex: 0,
                          }}
                          {...label}
                        />
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