import {
  Box,
  Checkbox,
  Typography,
  useTheme
} from '@mui/material'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { useSelector } from 'react-redux'
import { useEffect, useState, memo } from 'react'

const index = () => {
  console.log('renders')
  const theme = useTheme()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [clickOnCheck, setClickOnCheck] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState({})
  const [productDone, setProductDone] = useState({})
  const { page, newProduct } = useSelector(state => state)

  useEffect(() => {
    let selectedData
    switch (page) {
      case 'home':
        selectedData = 'weekly'
        break;
      case 'not done':
        selectedData = 'notDone'
        break;
      default:
        selectedData = page
        break;
    }

    const productsData = async () => {
      try {
        const datesResponse = await fetch(
          `http://localhost:8080/products/${selectedData}`,
          {
            method: 'GET'
          }
        )
        const savedDatesResponse = await datesResponse.json()
        if (datesResponse.ok) {
          const dataGroupedByDate = savedDatesResponse.reduce((acc, obj) => {
            const date = obj.expiryDate
            if (!acc[date]) {
              acc[date] = [obj]
            } else {
              acc[date].push(obj)
            }
            return acc
          }, {})
          setProducts(dataGroupedByDate)
          const initialDoneState = {}
          Object.keys(dataGroupedByDate).forEach(date => {
            dataGroupedByDate[date].forEach(product => {
              initialDoneState[product._id] = product.done
            })
          })
          setProductDone(initialDoneState)
          setLoading(false)
        } else {
          console.error(savedDatesResponse.message)
        }
      } catch (err) {
        console.error(err)
      }
    }
    productsData()
  }, [page, newProduct])

  const isCheck = (_id) => {
    const updatedProductDone = {
      ...productDone,
      lastUpdatedId: _id,
      [_id]: !productDone[_id]
    }
    setProductDone(updatedProductDone)
    setClickOnCheck(true)
  }

  useEffect(() => {
    if (clickOnCheck) {
      const updateCheck = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/products/updateDone`,
            {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ productId: productDone['lastUpdatedId'] }),
            }
          )
          const savedResponse = await response.json()
          if (response.ok) {
            console.log(savedResponse)
            setClickOnCheck(false)
          } else {
            console.error(savedResponse)
            setClickOnCheck(false)
          }
        } catch (err) {
          console.error(err)
          setClickOnCheck(false)
        }
      }
      updateCheck()
    }
  }, [productDone])

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
                    products[el].map((el, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Checkbox
                            checked={productDone[el._id]}
                            onChange={() => isCheck(el._id)}
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