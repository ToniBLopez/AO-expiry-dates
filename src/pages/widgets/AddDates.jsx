import {
  Box,
  TextField,
  Button,
  useTheme
} from "@mui/material"
import { memo } from "react"
import { useDispatch } from 'react-redux'
import { setNewProduct } from "../../state"
// import { useFormik } from 'formik'

const AddDates = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  // const onSubmit = async (values, actions) => isLogin
  //   ? await login(values, actions)
  //   : await register(values, actions)
  // const {
  //   values,
  //   errors,
  //   touched,
  //   setFieldValue,
  //   handleChange,
  //   handleBlur,
  //   handleSubmit,
  //   resetForm
  // } = useFormik({
  //   initialValues: isLogin ? initialValuesLogin : initialValuesRegister,
  //   validationSchema: isLogin ? loginSchema : registerSchema,
  //   onSubmit,
  // })

  const createOne = async () => {
    try {
      const nameId = document.getElementById('nameId').value
      const expiryDateId = document.getElementById('expiryDateId').value
      /* CREATE */
      const response = await fetch(
        // 'http://expirydates.fly.dev/products/createOne',
        'http://localhost:8080/products/createOne',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: nameId,
            expiryDate: expiryDateId
          })
        }
      )
      const savedResponse = await response.json()
      if (response.ok) {
        console.group('productCreated.ok')
        console.log(savedResponse)
        console.groupEnd()
        dispatch(setNewProduct())
        // await getProducts(dispatch, page)
      } else {
        console.error(savedResponse)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    // <form onSubmit={handleSubmit} encType='multipart/form-data'>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        bottom: '120px',
        height: '180px',
        width: '300px',
        justifyContent: 'space-between',
        borderRadius: '8px',
        p: '10px',
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
        // onBlur={handleBlur}
        // onChange={handleChange}
        // value={values.email}
        // error={Boolean(touched.email) && Boolean(errors.email)}
        // helperText={touched.email && errors.email}
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
        onClick={createOne}
        sx={{
          fontWeight: 'bold',
          "&:hover": {
            backgroundColor: theme.palette.selected.default
          }
        }}
      >
        Send
      </Button>
    </Box>
    // </form>
  )
}

export default memo(AddDates)
// export default AddDates