import {
  Box,
  TextField,
  Button,
  useTheme,
} from "@mui/material"
import { memo, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
// import { useFormik } from 'formik'
import { setNewProduct, setMessageAlert } from "../../state"

const AddDates = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const { store } = useSelector(state => state)

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createOne()
    if (formRef.current) {
      formRef.current.reset()
    }
  }
  const createOne = async () => {
    try {
      const nameId = document.getElementById('nameId').value
      const expiryDateId = document.getElementById('expiryDateId').value
      /* CREATE */
      const response = await fetch(
        'http://localhost:8080/products/createOne',
        // 'http://expirydates.fly.dev/products/createOne',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            store_id: store.storeId,
            name: nameId,
            expiryDate: expiryDateId,
          })
        }
      )
      const savedResponse = await response.json()
      if (response.ok) {
        console.group('productCreated.ok')
        console.log(savedResponse)
        console.groupEnd()
        dispatch((dispatch) => {
          dispatch(setMessageAlert({ type: 'success', message: savedResponse.message }))
          dispatch(setNewProduct())
        })
        // await getProducts(dispatch, page)
      } else {
        dispatch(setMessageAlert({ type: 'error', message: savedResponse.message }))
      }
    } catch (err) {
      dispatch(setMessageAlert({ type: 'error', message: err }))
      console.error(err)
    }
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        // encType='multipart/form-data'
        style={{
          display: 'flex',
          position: 'fixed',
          width: '100%',
          justifyContent: 'center',
          bottom: '16%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            width: '300px',
            bottom: '120px',
            left: '50%',
            borderRadius: '8px',
            p: '10px',
            margin: '0px 30px',
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <TextField
            required
            id="nameId"
            label='Name'
            name='name'
            type="name"
            variant='outlined'
            // error={Boolean(touched.name) && Boolean(errors.name)}
            // helperText={touched.name && errors.name}
            placeholder='Pechuga de Pollo'
            sx={{
              color: theme.palette.primary.main
            }}
          />

          <TextField
            required
            id="expiryDateId"
            label='Date'
            name='date'
            placeholder='DD.MM.YYYY'
            variant='outlined'
            sx={{
              color: theme.palette.primary.main
            }}
          />

          <Button
            type='submit'
            variant='contained'
            sx={{
              fontWeight: 'bold',
              "&:hover": {
                backgroundColor: theme.palette.selected.default
              }
            }}
          >
            Send
          </Button>
        </Box >
      </form>
    </>
  )
}

export default memo(AddDates)
// export default AddDates