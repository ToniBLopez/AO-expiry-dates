import getProductsData from "../GET"

const removeProduct = async ({
  dispatch,
  dataToRequest,
  confirmDeletion,
  showSnackbar
}) => {
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
      getProductsData(dispatch, dataRequest)
    } else {
      showSnackbar('error', savedDatesResponse)
      console.error(savedDatesResponse)
    }
  } catch (err) {
    showSnackbar('error', { message: 'Something went wrong' })
    console.error(err)
  }
}

export default removeProduct