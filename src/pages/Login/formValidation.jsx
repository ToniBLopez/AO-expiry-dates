import * as yup from 'yup'

const storeRules = /^\d{3}$/

export const loginSchema = yup.object().shape({
  store: yup
    .number()
    .matches(storeRules, 'Please enter a valid store, must contain 3 numbers')
    .required('Required'),
})

export const initialValuesLogin = {
  store: '',
}