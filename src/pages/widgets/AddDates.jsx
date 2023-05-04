import {
  Box,
  TextField,
  Button,
  useTheme
} from "@mui/material"
import {
  useEffect,
  useState,
  memo
} from "react"
import { useSelector, batch, useDispatch } from 'react-redux'
import getProducts from "../utils/getProducts"
// import { useFormik } from 'formik'

const AddDates = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { page } = useSelector(state => state)
  let nameId;
  let expiryDateId;

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
      nameId = document.getElementById('nameId').value
      expiryDateId = document.getElementById('expiryDateId').value
      /* CREATE */
      const response = await fetch(
        'http://expirydates.fly.dev/products/createOne',
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
        await getProducts(batch, dispatch, page)
      } else {
        console.error(savedResponse.message)
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
          fontWeight: 'bold'
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