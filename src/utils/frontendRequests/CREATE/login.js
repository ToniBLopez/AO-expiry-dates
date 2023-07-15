import { setStore, setMessageAlert } from "../../../state"

const login = async (dispatch, navigate) => {
  try {
    const storeValue = document.getElementById('store').value
    const response = await fetch(
      'http://localhost:8080/login',
      // 'http://expirydates.fly.dev/login',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store: storeValue }),
      }
    )
    const loggedIn = await response.json()

    if (response.ok) {
      dispatch((dispatch) => {
        dispatch(setStore({ storeId: loggedIn.storeId, number: storeValue, token: loggedIn.token }))
        dispatch(setMessageAlert({ type: 'success', message: loggedIn.message }))
      })
      await navigate('/home')
    } else {
      dispatch(setMessageAlert({ type: 'error', message: loggedIn.message }))
      console.error(loggedIn)
    }
  } catch (error) {
    dispatch(setMessageAlert({ type: 'error', message: 'Something went wrong in frontendRequest/CREATE/login.js' }))
    console.error(error)
  }
}

export default login