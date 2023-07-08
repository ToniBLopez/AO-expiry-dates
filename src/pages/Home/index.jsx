import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  useTheme,
  Snackbar,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, memo } from 'react'
import { setMessageAlert } from '../../state';

const index = () => {
  /* CONTROL THE NUMBER OF RENDERS */
  console.log('renders')

  const dispatch = useDispatch()
  const theme = useTheme()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const { page, newProduct, messageAlert } = useSelector(state => state)
  const { enqueueSnackbar } = useSnackbar()

  const [products, setProducts] = useState({})
  const [productDone, setProductDone] = useState({})
  const [open, setOpen] = useState(false)
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

  const showSnackbar = (type, response) => {
    dispatch(setMessageAlert({ type, message: response.message }))
  }

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

  const getProductsData = async (dataRequest, updateDone = true) => {
    try {
      const datesResponse = await fetch(
        `http://localhost:8080/products/${dataRequest}`,
        // `http://expirydates.fly.dev/products/${dataRequest}`,
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
        if (updateDone) {
          const initialDoneState = {}
          Object.keys(dataGroupedByDate).forEach(date => {
            dataGroupedByDate[date].forEach(product => {
              initialDoneState[product._id] = product.done
            })
          })
          setProductDone(initialDoneState)
          setLoading(false)
        }
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
        'http://localhost:8080/products/deleteOne',
        // 'http://expirydates.fly.dev/products/deleteOne',
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
        showSnackbar('success', savedDatesResponse)
        console.log(savedDatesResponse)
        const dataRequest = dataToRequest()
        getProductsData(dataRequest)
      } else {
        showSnackbar('error', savedDatesResponse)
        console.error(savedDatesResponse)
      }
    } catch (err) {
      showSnackbar('error', { message: 'Something went wrong' })
      console.error(err)
    }
  }

  const updateProducts = () => {
    const dataRequest = dataToRequest()
    getProductsData(dataRequest)
  }

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
    updateProducts()
  }, [page, newProduct])

  useEffect(() => {
    const updateCheck = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/products/updateDone',
          // 'http://expirydates.fly.dev/products/updateDone',
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
          updateProducts()
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

    if (clickOnCheck) {
      updateCheck()
    }
  }, [productDone])

  useEffect(() => {
    if (confirmDeletion.state) {
      console.log(confirmDeletion._id)
      removeProduct()
    }
  }, [confirmDeletion])

  useEffect(() => {
    if (messageAlert.type.length !== 0) {
      enqueueSnackbar(messageAlert.message, {
        variant: messageAlert.type,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
      })

      dispatch(setMessageAlert({ type: '', message: '' }))
    }
  }, [messageAlert])

  return (
    <Box>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
      >
      </Snackbar>

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
            {
              isEdit
                ? (
                  <ArrowDropDownIcon
                    fontSize='large'
                    sx={{
                      // color: theme.palette.primary.main,
                      color: theme.palette.selected.default,
                      transition: 'ease-in-out'
                    }}
                  />
                )
                : (
                  <EditIcon
                    sx={{
                      color: theme.palette.primary.main,
                      transition: 'ease-in-out',
                    }}
                  />
                )
            }
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