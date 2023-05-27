import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../components/Header'
import Menu from '../components/Menu'
import { useSelector } from 'react-redux'
import { useEffect, useState, memo } from 'react'

const index = () => {
  console.log('renders')
  const theme = useTheme()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [products, setProducts] = useState({})
  const [productDone, setProductDone] = useState({})
  const [loading, setLoading] = useState(true)
  const [clickOnCheck, setClickOnCheck] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [remove, setRemove] = useState({
    _id: '',
    state: false
  })
  const [confirmDeletion, setConfirmDeletion] = useState({
    _id: '',
    state: false
  })
  const { page, newProduct } = useSelector(state => state)

  const dataToRequest = () => {
    switch (page) {
      case 'home':
        return 'weekly'
      case 'not done':
        return 'notDone'
      default:
        return page
    }
  }

  const productsData = async (dataRequest) => {
    try {
      const datesResponse = await fetch(
        // `http://expirydates.fly.dev/products/${dataRequest}`,
        `http://localhost:8080/products/${dataRequest}`,
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

  const removeProduct = async () => {
    try {
      const datesResponse = await fetch(
        // 'http://expirydates.fly.dev/products/deleteOne',
        'http://localhost:8080/products/deleteOne',
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productId: confirmDeletion._id,
          }),
        }
      )
      const savedDatesResponse = await datesResponse.json()
      if (datesResponse.ok) {
        console.log(savedDatesResponse)
        const dataRequest = dataToRequest()
        productsData(dataRequest)
      } else {
        console.error(savedDatesResponse)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const dataRequest = dataToRequest()
    productsData(dataRequest)
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
            // `http://expirydates.fly.dev/products/updateDone`,
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

  useEffect(() => {
    if (confirmDeletion.state) {
      console.log('Iniside Confim Deletion')
      console.log(confirmDeletion._id)
      removeProduct()
    }
  }, [confirmDeletion])

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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: page === 'home' ? '1fr 1fr' : '1fr',
            alignItems: 'center',
            mb: '10px',
          }}
        >
          {page === 'home'
            &&
            <Typography
              sx={{
                justifySelf: 'start',
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}
            >
              7 days view
            </Typography>
          }
          <IconButton
            onClick={() => {
              if (isEdit) {
                setIsEdit(false)
                setRemove({ _id: '', state: false })
              } else {
                setIsEdit(!isEdit)
              }
            }}
            sx={{
              justifySelf: 'end',
            }}
          >
            <EditIcon
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
        </Box>
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
                    mb: '8px',
                  }}
                >
                  <Typography
                    variant='h3'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '38px',
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {formattedDate}
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      rowGap: isEdit && '5px',
                    }}
                  >
                    {
                      products[el].map((el, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: isEdit ? 'auto 1fr auto' : 'auto 1fr',
                              gap: '5px',
                              alignItems: 'center',
                              borderRadius: '20px',
                              backgroundColor: isEdit && theme.palette.background.selected,
                            }}
                          >
                            <Checkbox
                              checked={productDone[el._id]}
                              onChange={() => isCheck(el._id)}
                              sx={{
                                zIndex: 0,
                                justifySelf: 'start',
                              }}
                              {...label}
                            />
                            <Typography
                              variant='p'
                              sx={{
                                fontWeight: "bold",
                                justifySelf: 'start',
                              }}
                            >
                              {el.name}
                            </Typography>
                            {isEdit
                              &&
                              <IconButton
                                onClick={() => {
                                  if (remove.state && remove._id === el._id) {
                                    setConfirmDeletion({ _id: remove._id, state: true })
                                  } else if (confirmDeletion.state) {
                                    setConfirmDeletion({ _id: '', state: false })
                                    setRemove({ _id: el._id, state: true })
                                  } else {
                                    setRemove({ _id: el._id, state: true })
                                  }
                                }}
                                sx={{
                                  color: 'red',
                                  // justifySelf: 'end',
                                }}
                              >
                                {
                                  remove.state && remove._id === el._id
                                    ?
                                    <Typography
                                      sx={{
                                        color: 'red',
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Remove
                                    </Typography>
                                    :
                                    <DeleteIcon />
                                }
                              </IconButton>
                            }
                          </Box>
                        )
                      }
                      )
                    }
                  </Box>
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